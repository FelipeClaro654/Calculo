class CustasController < ApplicationController
    include ApplicationHelper
    def index
    end

    def destroy
        @custa = Custa.find(params[:custa_id])
        @custa.destroy
        render :json => { :success => true, custa_id: params[:custa_id] }
    end
end
