class AddFolhasToAutors < ActiveRecord::Migration[5.0]
  def change
    add_column :autors, :folhas, :string
  end
end
