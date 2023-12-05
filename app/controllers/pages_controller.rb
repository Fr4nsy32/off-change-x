class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :exchange]

  def home

  end

  def exchange

  end

end
