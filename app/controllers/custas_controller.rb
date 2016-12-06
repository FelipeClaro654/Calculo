class CustasController < ApplicationController
    include ApplicationHelper
    def index
    end

    def destroy
        @custa = Custa.find(params[:custa_id])
        @processo = @custa.processo
        @custa.destroy
        calcula_custas(@processo)
        render :js => "window.location = '/processos/"+@processo.id.to_s+"/edit'"
    end
end
