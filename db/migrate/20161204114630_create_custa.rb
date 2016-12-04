class CreateCusta < ActiveRecord::Migration[5.0]
  def change
    create_table :custa do |t|
      t.references :processo, foreign_key: true
      t.date :custas_data
      t.decimal :custas_valor
      t.decimal :custas_corrigida
      t.decimal :indice
      t.string :folhas

      t.timestamps
    end
  end
end
