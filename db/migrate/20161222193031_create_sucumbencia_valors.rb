class CreateSucumbenciaValors < ActiveRecord::Migration[5.0]
  def change
    create_table :sucumbencia_valors do |t|
      t.decimal :valor
      t.date :sucumbencia_data
      t.decimal :sucumbencia_corrigida
      t.decimal :indice
      t.string :folhas
      t.references :processo, foreign_key: true

      t.timestamps
    end
  end
end
