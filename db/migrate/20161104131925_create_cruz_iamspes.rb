class CreateCruzIamspes < ActiveRecord::Migration[5.0]
  def change
    create_table :cruz_iamspes do |t|
      t.string :nome

      t.timestamps
    end
  end
end
