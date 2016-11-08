class AddProcessoIdToAutors < ActiveRecord::Migration[5.0]
  def change
    add_column :autors, :processo_id, :integer
  end
end
