class Processo < ApplicationRecord
  has_many :autors, :dependent => :destroy
  accepts_nested_attributes_for :autors, reject_if: :all_blank, allow_destroy: true
  belongs_to :cbpm_ipesp
  belongs_to :cruz_iamspe
  belongs_to :data_calculo
  belongs_to :tabela_atualizacao
  belongs_to :tipo_juro
end
