class CreateProcessos < ActiveRecord::Migration[5.0]
  def change
    create_table :processos do |t|
      t.string :numero
      t.date :data_distribuicao
      t.string :processo_autor
      t.string :forum
      t.date :data_citacao
      t.string :vara
      t.string :tipo_processo
      t.string :data_base
      t.string :sentenca
      t.string :re
      t.string :acordao
      t.string :base_calculo_autor
      t.integer :tabela_atualizacao_id
      t.integer :cbpm_ipesp_id
      t.decimal :cbpm_ipesp_valor
      t.decimal :juros
      t.integer :tipo_juro_id
      t.integer :cruz_iamspe_id
      t.decimal :cruz_iamspe_valor
      t.integer :data_calculo_id

      t.timestamps
    end
  end
end
