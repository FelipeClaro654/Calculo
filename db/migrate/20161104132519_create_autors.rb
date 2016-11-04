class CreateAutors < ActiveRecord::Migration[5.0]
  def change
    create_table :autors do |t|
      t.string :nome
      t.references :processo, foreign_key: true

      t.timestamps
    end
  end
end
