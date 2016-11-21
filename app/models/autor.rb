class Autor < ApplicationRecord
  validates :nome,  presence: true
  belongs_to :processo
  has_many :pagamentos, :dependent => :delete_all
end
