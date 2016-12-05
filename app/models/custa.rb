class Custa < ApplicationRecord
    validates :custas_data,  presence: true
    validates :custas_valor,  presence: true
    validates :custas_corrigida,  presence: true
    validates :indice,  presence: true
    validates :folhas,  presence: true
    belongs_to :processo
end
