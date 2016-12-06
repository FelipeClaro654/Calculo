class CustasController < ApplicationController
    include ApplicationHelper
    def index
    end

    def destroy
        @custa = Custa.find(params[:custa_id])
        @processo = @custa.processo
        @custa.destroy
        calcula_custas(@processo)
        render :json => { :success => true, custa_id: params[:custa_id] }
    end
end
