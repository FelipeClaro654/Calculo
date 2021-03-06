class CreatePagamentos < ActiveRecord::Migration[5.0]
  def change
    create_table :pagamentos do |t|
      t.references :autor, foreign_key: true
      t.integer :table_index
      t.string :periodo_inicial
      t.string :periodo_final
      t.decimal :periodo_value
      t.decimal :indice_tabela
      t.decimal :indice_atualizacao
      t.decimal :bruto_atualizacao
      t.decimal :previdencia_assistencia
      t.decimal :previdencia
      t.decimal :assistencia
      t.decimal :liquido_atualizado
      t.decimal :meses
      t.decimal :juros
      t.decimal :honorario
      t.date :periodo
      t.timestamps
    end
  end
end
