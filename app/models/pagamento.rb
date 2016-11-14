class Pagamento < ApplicationRecord
    belongs_to :autor

    def self.gravar_pagamento(params)
        @pagamento = Pagamento.new(
                                    autor_id: params[:autor_id],
                                    table_index: params[:table_index],
                                    periodo_inicial: params[:periodo_inicial],
                                    periodo_final: params[:periodo_final],
                                    periodo_value: params[:periodo_value],
                                    indice_tabela: params[:indice_tabela],
                                    bruto_atualizacao: params[:bruto_atualizacao],
                                    previdencia: params[:previdencia],
                                    liquido_atualizado: params[:liquido_atualizado],
                                    meses: params[:meses],
                                    juros: params[:juros],
                                    honorario: params[:honorario]
                                )
        @pagamento.save!
    end
end
