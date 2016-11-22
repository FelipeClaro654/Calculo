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
                create_pagamentos(@processo.autors)
                format.html { render :edit, notice: 'Processo was successfully created.' }
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
                if @old_ids.empty?
                    create_pagamentos(@processo.autors)
                else
                    @new_autores = @processo.autors.where('id NOT IN (?)', @old_ids)
                    create_pagamentos(@new_autores)
                    update_autores(@processo)
                end

                format.html { render :edit, notice: 'Processo was successfully updated.' }
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
            format.html { redirect_to processos_url, notice: 'Processo was successfully destroyed.' }
            format.json { head :no_content }
        end
    end

    def update_autores(processo)
        processo.autors.each do |a|
            @pagamentos = Pagamento.where(autor_id: a.id)
            @pagamentos.update_all(
                :indice_atualizacao => processo.indice_tabela
            )
            update_pagamentos(@pagamentos)
        end
    end

    def create_pagamentos(autores)
        autores.each do |a|
            @periodos = retorna_periodos(a)
            @periodos.each_with_index do |per, index|

                if per.kind_of?(Array)
                    @periodo_inicial = per[0]
                    @periodo_final = per[1]
                    indice_periodo = retorna_indice(("01/"+per[2].to_s + "/" + per[3].to_s).to_datetime, a.processo.tabela_atualizacao.nome)
                else
                    @periodo_inicial = per
                    @periodo_final = per + 1
                    indice_periodo = retorna_indice(per, a.processo.tabela_atualizacao.nome)
                end

                if index == 0
                    periodo_value = 0
                else
                    periodo_value = 100
                end
                meses = month_difference(a.periodo_inicial, a.periodo_final)
                results = calcula_pagamentos(
                                            periodo_value,
                                            indice_periodo,
                                            meses,
                                            a.processo
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
                  p.previdencia = results[:previdencia].round(2)
                  p.liquido_atualizado = results[:liquido_atualizado].round(2)
                  p.juros = results[:juros].round(2)
                  p.honorario = results[:honorario].round(2)
                  p.meses = meses
                end
                pagamento.save!
            end
        end
    end

    def calcula_pagamentos(periodo_v, i_tabela, meses, processo)
        i_atualizacao = processo.indice_tabela
        prev_porc = processo.cbpm_ipesp_valor
        assist_porc = processo.cruz_iamspe_valor
        data_calculo = processo.data_calculo.nome
        juros_porc = processo.juros

        bruto = periodo_v
        indice_periodo = i_tabela
        indice_atualizacao = i_atualizacao

        if juros_porc.to_s == "0.5"
            data = data_calculo == "Data" ? processo.data_base : processo.data_citacao
            juros_porc = atualiza_juros(data) == [] ? 0.5 : atualiza_juros(data).to_d
        end

        bruto_atualizacao = bruto/indice_periodo*indice_atualizacao
        previdencia = bruto_atualizacao*(prev_porc/100 + assist_porc/100)
        liquido_atualizado = bruto_atualizacao - previdencia
        juros = bruto_atualizacao*meses*(juros_porc/100)
        honorario = (bruto_atualizacao + juros)*10/100
        results = {
            "bruto_atualizacao": bruto_atualizacao,
            "previdencia": previdencia,
            "liquido_atualizado": liquido_atualizado,
            "juros": juros,
            "honorario": honorario
        }
        return results
    end

    def atualiza_juros(data)
        juros_atualizado = TabelaJuro.where(ano: data.year.to_s).where(mes: data.month.to_s)

        if juros_atualizado.nil?
            juros_atualizado = 0,005
        end
        juros_atualizado
    end

    def update_pagamentos(pagamentos)
        pagamentos.each do |p|
            results = calcula_pagamentos(
                                        p.periodo_value,
                                        p.indice_tabela,
                                        p.meses,
                                        p.autor.processo
                                        )
            p.update_attributes(
                :bruto_atualizacao => results[:bruto_atualizacao].round(2),
                :previdencia => results[:previdencia].round(2),
                :liquido_atualizado => results[:liquido_atualizado].round(2),
                :juros => results[:juros].round(2),
                :honorario => results[:honorario].round(2)
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
        autors_attributes: [:id, :nome, :periodo_inicial, :periodo_final, :_destroy])
    end
end
