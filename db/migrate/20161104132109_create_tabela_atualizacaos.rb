class CreateTabelaAtualizacaos < ActiveRecord::Migration[5.0]
  def change
    create_table :tabela_atualizacaos do |t|
      t.string :nome

      t.timestamps
    end
  end
end
