class TabelaJudicialController < ApplicationController
    def edit_table
        @tabela = TabelaJudicial.order("ano desc").order("mes")
    end

    def update_valor
        params[:valor] = 0 if params[:valor] == ""
        @row = TabelaJudicial.where("ano = :ano and mes = :mes", {ano: params[:ano], mes:  params[:mes] })
        @row[0].update_attribute(:valor, params[:valor])
    end
end
