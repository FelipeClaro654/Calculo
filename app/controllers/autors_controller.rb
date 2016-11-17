class AutorsController < ApplicationController
    include ApplicationHelper
    def index
    end

    def show_autor_table
        if params[:autor]
            @autor = Autor.find(params[:autor])
            @inicio = @autor.periodo_inicial

            @periodos = retorna_periodos(@autor)

            @tabela = @autor.processo.tabela_atualizacao.nome
            range_anos = (@autor.periodo_final.year) - (@autor.periodo_inicial.year)
            anos = []

            (0..range_anos).each_with_index do |r, index|
                anos.push("\t"+(@autor.periodo_inicial.year + index).to_s + "\t")
            end
            @meses = month_difference(@autor.periodo_inicial, @autor.periodo_final)

            if @tabela == "PCA-E"
                @tabela = TabelaOpv.where("ano IN (?)", anos)
                @indice_atualizacao =
                    TabelaOpv.where(ano: "\t"+(@autor.processo.data_base.year).to_s + "\t").
                    where(mes: "\t"+(@autor.processo.data_base.strftime("%m")) + "\t")[0].valor
            else
                @tabela = TabelaJudicial.where("ano IN (?)", anos)
                @indice_atualizacao =
                    TabelaJudicial.where(ano: "\t"+(@autor.processo.data_base.year).to_s + "\t").
                    where(mes: "\t"+(@autor.processo.data_base.strftime("%m")) + "\t")[0].valor
            end

            @pagamentos = Pagamento.where(autor_id: @autor.id)

            render 'autor_table'
        else
            format.html { redirect_to @autor.processo, notice: "Informe o ID do Autor" }
        end
    end

    def salva_pagamentos
        if params[:pagamento_id].present?
            @pagamento = Pagamento.editar_pagamento(params)
        else
            @pagamento = Pagamento.gravar_pagamento(params)
        end
        head :ok
    end
end
