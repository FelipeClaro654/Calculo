class Processo < ApplicationRecord
  validates :numero, uniqueness: true, presence: true
  validates :data_distribuicao, presence: true
  validates :data_citacao, presence: true
  validates :forum, presence: true
  validates :vara, presence: true
  validates :tipo_processo, presence: true
  validates :data_base, presence: true
  validates :sentenca, presence: true
  validates :re, presence: true
  validates :acordao, presence: true
  validates :base_calculo_autor, presence: true
  validates :data_base, presence: true
  validates :indice_tabela, presence: true
  validates :cbpm_ipesp_valor, presence: true
  validates :juros, presence: true
  validates :cruz_iamspe_valor, presence: true
  validates :processo_autor, presence: true
  validates :sucumbencia, presence: true
  validates :tipo_sucumbencia, presence: true
  has_many :autors, :dependent => :destroy, :inverse_of => :processo
  has_many :custas, :dependent => :destroy, :inverse_of => :processo
  has_many :sucumbencia_valors, :dependent => :destroy, :inverse_of => :processo
  accepts_nested_attributes_for :autors, reject_if: :all_blank, allow_destroy: true
  accepts_nested_attributes_for :custas, reject_if: :all_blank, allow_destroy: true
  accepts_nested_attributes_for :sucumbencia_valors, reject_if: :all_blank, allow_destroy: true
  belongs_to :cbpm_ipesp
  belongs_to :cruz_iamspe
  belongs_to :data_calculo
  belongs_to :tabela_atualizacao
  belongs_to :tipo_juro
  belongs_to :tipo_sucumbencia
end
