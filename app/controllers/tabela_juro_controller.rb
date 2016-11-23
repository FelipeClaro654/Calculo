class TabelaJuroController < ApplicationController
    def edit_table
        @tabela = TabelaJuro.order("ano desc").order("mes")
    end

    def update_valor
        params[:valor] = 0 if params[:valor] == ""
        @row = TabelaJuro.where("ano = :ano and mes = :mes", {ano: params[:ano], mes:  params[:mes] })
        @row[0].update_attribute(:valor, params[:valor])
    end

    def add_ano
        @max_ano = TabelaJuro.maximum("ano").to_i + 1

        (1..12).each do |nv|
            mes = ""
            if nv.to_s.length > 1
                mes = nv.to_s
            else
                mes = "0" + (nv.to_s)
            end
            novo_registro = TabelaJuro.new(
                                                mes: mes,
                                                ano: @max_ano,
                                                valor: 0.000000,
                                                status: "Ativo"
                                             )
            novo_registro.save!
        end
    end
end
