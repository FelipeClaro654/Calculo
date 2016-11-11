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

            @periodos.push(@inicio)

            render 'autor_table'
        else
            format.html { redirect_to @autor.processo, notice: "Informe o ID do Autor" }
        end
    end
end
