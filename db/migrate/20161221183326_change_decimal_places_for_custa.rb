class ChangeDecimalPlacesForCusta < ActiveRecord::Migration[5.0]
  def change
      change_column :custa, :custas_valor, :decimal, precision: 5, scale: 2
  end
end
