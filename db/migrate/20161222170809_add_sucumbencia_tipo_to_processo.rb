class AddSucumbenciaTipoToProcesso < ActiveRecord::Migration[5.0]
  def change
    add_column :processos, :tipo_sucumbencia_id, :integer
  end
end
