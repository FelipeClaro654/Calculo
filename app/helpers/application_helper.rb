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
end
