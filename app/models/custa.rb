class Custa < ApplicationRecord
    validates :custas_data,  presence: true
    validates :custas_valor,  presence: true, numericality: true, allow_nil: false
    validates :custas_corrigida,  presence: true, numericality: true, allow_nil: false
    validates :indice,  presence: true
    validates :folhas,  presence: true
    belongs_to :processo
end
