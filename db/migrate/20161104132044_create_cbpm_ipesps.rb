class CreateCbpmIpesps < ActiveRecord::Migration[5.0]
  def change
    create_table :cbpm_ipesps do |t|
      t.string :nome

      t.timestamps
    end
  end
end
