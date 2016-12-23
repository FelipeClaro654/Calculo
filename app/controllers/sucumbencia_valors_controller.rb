class SucumbenciaValorsController < ApplicationController
    include ApplicationHelper
    def index
    end

    def destroy
        @sucumbencia = SucumbenciaValor.find(params[:sucumbencia_id])
        @processo = @sucumbencia.processo
        @sucumbencia.destroy
        calcula_custas(@processo)
        render :js => "window.location = '/processos/"+@processo.id.to_s+"/edit'"
    end
end
