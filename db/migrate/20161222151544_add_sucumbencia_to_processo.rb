class AddSucumbenciaToProcesso < ActiveRecord::Migration[5.0]
  def change
    add_column :processos, :sucumbencia, :decimal
  end
end
