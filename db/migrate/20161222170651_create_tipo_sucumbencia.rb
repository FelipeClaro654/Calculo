class CreateTipoSucumbencia < ActiveRecord::Migration[5.0]
  def change
    create_table :tipo_sucumbencia do |t|
      t.string :nome

      t.timestamps
    end
  end
end
