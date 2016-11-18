module ApplicationHelper

    def month_difference(data_a, data_b)
        difference = 0.0
        if data_a.year != data_b.year
            difference += (data_b - data_a).to_f / 30.4375
        end
        difference.round(2)
    end

    def retorna_periodos(autor)
        inicio = autor.periodo_inicial
        periodos = []
        while inicio < autor.periodo_final do
            if inicio.month == 11
                periodos.push(["13ºSal " + inicio.strftime("/%y"),
                                "Dez " + inicio.strftime("/%y"),
                                12, inicio.year])
            end
            periodos.push(inicio)
            inicio = inicio.beginning_of_month + 1.month
        end
        periodos
    end

    def retorna_indice_front
        if params[:tabela] == "PCA-E"
            @indice_tabela =
                TabelaOpv.where(ano:  params[:data_base][6..9] ).
                where(mes:  params[:data_base][3..4] )
        else
            @indice_tabela =
                TabelaJudicial.where(ano:  params[:data_base][6..9] ).
                where(mes:  params[:data_base][3..4] )
        end

        if @indice_tabela.empty?
            render :json => { :success => false }
        else
            render :json => { :success => true, :indice_tabela => @indice_tabela[0].valor }
        end
    end

    def retorna_indice(data_base, tabela)
        if data_base == "PCA-E"
            @indice_tabela =
                TabelaOpv.where(ano:  data_base.year.to_s ).
                where(mes:  data_base.strftime("%m") )[0].valor
        else
            @indice_tabela =
                TabelaJudicial.where(ano:  data_base.year.to_s ).
                where(mes:  data_base.strftime("%m") )[0].valor
        end
        @indice_tabela
    end
end
