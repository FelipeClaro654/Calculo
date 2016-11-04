class CreateDataCalculos < ActiveRecord::Migration[5.0]
  def change
    create_table :data_calculos do |t|
      t.string :nome

      t.timestamps
    end
  end
end
