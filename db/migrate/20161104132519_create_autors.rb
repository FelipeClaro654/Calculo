class CreateAutors < ActiveRecord::Migration[5.0]
  def change
    create_table :autors do |t|
      t.string :nome
      t.integer :processo_id

      t.timestamps
    end
  end
end
