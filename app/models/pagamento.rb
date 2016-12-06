class Pagamento < ApplicationRecord
    belongs_to :autor

    def self.editar_pagamento(params)
        @pagamento = Pagamento.find(params[:pagamento_id])
        @pagamento.update_attributes(
                                        periodo_value: params[:periodo_value],
                                        indice_tabela: params[:indice_tabela],
                                        indice_atualizacao: params[:indice_atualizacao],
                                        bruto_atualizacao: params[:bruto_atualizacao],
                                        assistencia: params[:assistencia],
                                        previdencia: params[:previdencia],
                                        previdencia_assistencia: params[:previdencia_assistencia],
                                        liquido_atualizado: params[:liquido_atualizado],
                                        meses: params[:meses],
                                        juros: params[:juros],
                                        honorario: params[:honorario]
                                    )
        @pagamento.save!
    end
end
