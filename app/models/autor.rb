class Autor < ApplicationRecord
  validates :nome,  presence: true
  validates :periodo_inicial,  presence: true
  validates :periodo_final,  presence: true
  validates :folhas,  presence: true
  belongs_to :processo
  has_many :pagamentos, :dependent => :delete_all
end
