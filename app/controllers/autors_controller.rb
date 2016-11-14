class AutorsController < ApplicationController
    def index
    end

    def show_autor_table
        if params[:autor]
            @autor = Autor.find(params[:autor])
            @periodos = []
            @inicio = @autor.periodo_inicial

            while @inicio < @autor.periodo_final do
               @periodos.push(@inicio)
               @inicio = @inicio.beginning_of_month + 1.month
            end
            @tabela = @autor.processo.tabela_atualizacao.nome
            range_anos = (@autor.periodo_final.year) - (@autor.periodo_inicial.year)
            anos = []

            (0..range_anos).each_with_index do |r, index|
                anos.push("\t"+(@autor.periodo_inicial.year + index).to_s + "\t")
            end
            @meses = month_difference(@autor.periodo_inicial, @autor.periodo_final)

            if @tabela == "PCA-E"
                @tabela = TabelaOpv.where("ano IN (?)", anos)
            else
                @tabela = TabelaJudicial.where("ano IN (?)", anos)
            end

            @pagamentos = Pagamento.where(autor_id: @autor.id)

            render 'autor_table'
        else
            format.html { redirect_to @autor.processo, notice: "Informe o ID do Autor" }
        end
    end

    def month_difference(data_a, data_b)
        difference = 0.0
        if data_a.year != data_b.year
            difference += (data_b - data_a).to_f / 30.4375
        end
        difference.round(2)
    end

    def salva_pagamentos
        @pagamento = Pagamento.gravar_pagamento(params)
        head :ok
    end
end
