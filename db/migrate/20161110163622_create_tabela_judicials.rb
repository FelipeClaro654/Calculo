class CreateTabelaJudicials < ActiveRecord::Migration[5.0]
  def change
    create_table :tabela_judicials do |t|
      t.string :mes
      t.string :ano
      t.decimal :valor
      t.string :status

      t.timestamps
    end
  end
end
