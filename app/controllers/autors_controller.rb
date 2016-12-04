class AutorsController < ApplicationController
    include ApplicationHelper
    def index
    end

    def show_autor_table
        if params[:autor]
            @autor = Autor.find(params[:autor])
            @indice_atualizacao = retorna_indice(@autor.processo.data_base, @autor.processo.tabela_atualizacao.nome)
            @pagamentos = Pagamento.where(autor_id: @autor.id)

            render 'autor_table'
        else
            format.html { redirect_to @autor.processo, notice: "Informe o ID do Autor" }
        end
    end

    def salva_pagamentos
        if params[:pagamento_id].present?
            @pagamento = Pagamento.editar_pagamento(params)
        end
        head :ok
    end

    def destroy
        @autor = Autor.find(params[:autor_id])
        @autor.destroy
        render :json => { :success => true, autor_id: params[:autor_id] }
    end

    def salva_totais
        @autor = Autor.find(params[:autor_id])
        @autor.update_attributes(
            :bruto => params[:bruto],
            :juros => params[:juros],
            :assistencia => params[:assistencia],
            :liquido => params[:liquido],
            :honorario => params[:honorario],
            :total_individual => params[:total_individual]
        )
        head :ok
    end
end
