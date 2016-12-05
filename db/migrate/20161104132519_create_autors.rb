class CreateAutors < ActiveRecord::Migration[5.0]
  def change
    create_table :autors do |t|
      t.string :nome
      t.date :periodo_inicial
      t.date :periodo_final
      t.decimal :liquido
      t.decimal :previdencia
      t.decimal :bruto
      t.decimal :juros
      t.decimal :honorario
      t.decimal :custas
      t.decimal :total_individual
      t.timestamps
    end
  end
end
