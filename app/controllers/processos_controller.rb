class ProcessosController < ApplicationController
    include ApplicationHelper
    before_action :set_processo, only: [:show, :edit, :update, :destroy]
    # GET /processos
    # GET /processos.json
    def index
        @processos = Processo.all
    end

    # GET /processos/1
    # GET /processos/1.json
    def show
    end

    # GET /processos/new
    def new
        @processo = Processo.new
        @tabela_atualizacao = TabelaAtualizacao.all
    end

    # GET /processos/1/edit
    def edit
    end

    # POST /processos
    # POST /processos.json
    def create
        @processo = Processo.new(processo_params)
        respond_to do |format|
            if @processo.save
                calcula_custas(@processo)
                create_pagamentos(@processo.autors)
                format.html { render :edit, notice: 'Processo criado com sucesso.' }
                format.json { render :show, status: :created, location: @processo }
            else
                format.html { render :new, collection: @tabela_atualizacao }
                format.json { render json: @processo.errors, status: :unprocessable_entity }
            end
        end
    end

    # PATCH/PUT /processos/1
    # PATCH/PUT /processos/1.json
    def update
        respond_to do |format|
            old_autores = @processo.autors
            @old_ids = []
            old_autores.each do |o|
                @old_ids.push(o.id)
            end

            if @processo.update(processo_params)
                troca_sucumbencia(@processo)
                calcula_custas(@processo)
                if @processo.autors.count > 0
                    if @old_ids.empty?
                        create_pagamentos(@processo.autors)
                    else
                        @new_autores = @processo.autors.where('id NOT IN (?)', @old_ids)
                        if @new_autores.empty?
                            @old_autores =  @processo.autors
                        else
                            create_pagamentos(@new_autores)
                            @new_ids = []
                            @new_autores.each do |n|
                                @new_ids.push(n.id)
                            end
                            @old_autores =  @processo.autors.where('id NOT IN (?)', @new_ids)
                        end

                        @old_autores.each do |o|
                            if o.pagamentos.length > 0
                                update_autores(@old_autores)
                            end
                        end
                    end
                end

                format.html { render :edit, notice: 'Processo atualizado com sucesso.' }
                format.json { render json: @processo, status: :ok, location: @processo }
            else
                format.html { render :edit }
                format.json { render json: @processo.errors, status: :unprocessable_entity }
            end
        end
    end

    # DELETE /processos/1
    # DELETE /processos/1.json
    def destroy
        @processo.destroy
        respond_to do |format|
            format.html { redirect_to processos_url, notice: 'Processo excluído com sucesso.' }
            format.json { head :no_content }
        end
    end

    def render_resumo
        @processo = Processo.find(params[:processo_id])
        render 'resumo'
    end

    def update_autores(old_autores)
        old_autores.each do |a|
            @pagamentos = Pagamento.where(autor_id: a.id)
            @pagamentos.update_all(
                :indice_atualizacao => a.processo.indice_tabela
            )
            update_pagamentos(@pagamentos)
        end
    end

    def calcula_pagamentos(a, b, g, processo, periodo, is_decimo)
        g = atualiza_meses(processo.data_citacao, periodo, g)
        c = processo.indice_tabela

        if is_decimo
            prev_porc = 0
            assist_porc = 0
        else
            prev_porc = processo.cbpm_ipesp_valor
            assist_porc = processo.cruz_iamspe_valor
        end

        data_calculo = processo.data_calculo.nome
        juros_porc = processo.juros
        d = (a.to_d)/b*c
        d = d.round(2)

        prev = (prev_porc/100)*d
        assist = (assist_porc/100)*d

        e = (prev + assist).round(2)

        f = d - e
        f = f.round(2)
        h = f*g*juros_porc/100
        h = h.round(2)

        if processo.tipo_sucumbencia.nome == "%"
            honorario = (d + h)*processo.sucumbencia/100
            honorario = honorario.round(2)
        else
            honorario = 0
        end

        results = {
            "bruto_atualizacao": d,
            "previdencia_assistencia": e,
            "liquido_atualizado": f,
            "juros": h,
            "honorario": honorario,
            "meses": g,
            "previdencia": prev.round(2),
            "assistencia": assist.round(2)
        }
        return results
    end

    def atualiza_juros
        juros_atualizado = TabelaJuro.where(ano: params[:ano]).where(mes: params[:mes])

        if juros_atualizado.empty?
            juros_atualizado = 0.5
        else
            juros_atualizado = juros_atualizado[0].valor
        end
        render :json => {:success => true, :juros_atualizado =>  juros_atualizado}
    end

    def create_pagamentos(autores)
        autores.each do |a|
            @periodos = retorna_periodos(a)
            @periodos.each_with_index do |per, index|
                is_decimo = false
                if per.kind_of?(Array)
                    @periodo_inicial = per[0]
                    @periodo_final = per[1]
                    indice_periodo = retorna_indice(("01/"+per[2].to_s + "/" + per[3].to_s).to_datetime, a.processo.tabela_atualizacao.nome)
                    is_decimo = true
                else
                    @periodo_inicial = per
                    @periodo_final = per + 1.month

                    indice_periodo = retorna_indice(@periodo_final, a.processo.tabela_atualizacao.nome)
                end

                if index == 0
                    periodo_value = 0
                else
                    periodo_value = 100
                end
                meses = month_difference(a.processo.data_citacao, a.processo.data_base)
                results = calcula_pagamentos(
                                            periodo_value,
                                            indice_periodo,
                                            meses,
                                            a.processo,
                                            per.kind_of?(Array) ? ("01/"+per[2].to_s + "/" + per[3].to_s).to_datetime - 1.month : @periodo_inicial,
                                            is_decimo
                                            )
                pagamento = Pagamento.new do |p|
                  p.autor_id = a.id
                  p.table_index = index
                  p.periodo_inicial = @periodo_inicial
                  p.periodo_final = @periodo_final
                  p.periodo_value = periodo_value
                  p.indice_tabela = indice_periodo
                  p.indice_atualizacao = a.processo.indice_tabela
                  p.bruto_atualizacao = results[:bruto_atualizacao].round(2)
                  p.previdencia_assistencia = results[:previdencia_assistencia].round(2)
                  p.liquido_atualizado = results[:liquido_atualizado].round(2)
                  p.juros = results[:juros].round(2)
                  p.honorario = results[:honorario].round(2)
                  p.meses = results[:meses]
                  p.assistencia = results[:assistencia].round(2)
                  p.previdencia = results[:previdencia].round(2)
                  p.periodo = per.kind_of?(Array) ? ("01/"+per[2].to_s + "/" + per[3].to_s).to_datetime : @periodo_final
                end
                pagamento.save!
            end
        end
    end

    def update_pagamentos(pagamentos)
        meses = month_difference(pagamentos[0].autor.processo.data_citacao, pagamentos[0].autor.processo.data_base)
        pagamentos.each do |p|
            is_decimo = false
            if p.periodo_final.length == 7
                is_decimo = true
            end

            indice_periodo = retorna_indice(p.periodo, p.autor.processo.tabela_atualizacao.nome)
            results = calcula_pagamentos(
                                        p.periodo_value,
                                        indice_periodo,
                                        meses,
                                        p.autor.processo,
                                        p.periodo - 1.month,
                                        is_decimo
                                        )
            p.update_attributes(
                :indice_tabela => indice_periodo,
                :bruto_atualizacao => results[:bruto_atualizacao].round(2),
                :previdencia_assistencia => results[:previdencia_assistencia].round(2),
                :liquido_atualizado => results[:liquido_atualizado].round(2),
                :juros => results[:juros].round(2),
                :honorario => results[:honorario].round(2),
                :meses => results[:meses],
                :assistencia => results[:assistencia].round(2),
                :previdencia => results[:previdencia].round(2)
            )
        end
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_processo
        @processo = Processo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def processo_params
        params.require(:processo).permit(
        :numero,
        :data_distribuicao,
        :processo_autor,
        :forum,
        :data_citacao,
        :vara,
        :tipo_processo,
        :data_base,
        :indice_tabela,
        :sentenca,
        :re,
        :acordao,
        :base_calculo_autor,
        :tabela_atualizacao_id,
        :cbpm_ipesp_id,
        :cbpm_ipesp_valor,
        :juros,
        :tipo_juro_id,
        :cruz_iamspe_id,
        :cruz_iamspe_valor,
        :data_calculo_id,
        :sucumbencia,
        :tipo_sucumbencia_id,
        custas_attributes: [:id, :custas_data, :custas_valor, :custas_corrigida, :indice, :folhas, :_destroy],
        autors_attributes: [:id, :nome, :periodo_inicial, :periodo_final, :folhas, :_destroy],
        sucumbencia_valors_attributes: [:id, :sucumbencia_data, :valor, :sucumbencia_corrigida, :indice, :folhas, :_destroy]
        )
    end
end
