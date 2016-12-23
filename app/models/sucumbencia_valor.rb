class SucumbenciaValor < ApplicationRecord
    validates :sucumbencia_data,  presence: true
    validates :valor,  presence: true, numericality: true, allow_nil: false
    validates :sucumbencia_corrigida,  presence: true, numericality: true, allow_nil: false
    validates :indice,  presence: true
    validates :folhas,  presence: true
    belongs_to :processo
end
