class ErrorsController < ApplicationController

  # def show
  #   status_code = params[:code] || 500
  #   flash.alert = "Status #{status_code}"
  #   render status_code.to_s, status: status_code
  # end

  def not_found
    render status: 404
  end

  def internal_server
    render status: 500
  end

  def unprocessable
    render status: 422
  end

  def unacceptable
    render status: 406
  end

end
