class Autor < ApplicationRecord
  validates :nome,  presence: true
  belongs_to :processo
end
