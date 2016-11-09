class CreateAutors < ActiveRecord::Migration[5.0]
  def change
    create_table :autors do |t|
      t.string :nome
      t.date :periodo_inicial
      t.date :periodo_final
      t.timestamps
    end
  end
end
