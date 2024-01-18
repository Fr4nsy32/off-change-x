require 'net/http'
require 'json'

class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :exchange, :currency]

  def home
    @store=Store.near(current_user())
  end

  def index
    @records = policy_scope(Record)
  end

  def exchange
    @body_classes ||= []
    @body_classes << 'exclude-navbar'
    current_user
    @wallets = Wallet.where(user_id: current_user)
    amount = params[:amount].to_f
    @transaction = Transaction.new
  end

  def currency
    url = 'https://api.frankfurter.app/latest'
    uri = URI(url)
    response = Net::HTTP.get(uri)
    @parsed = JSON.parse(response)
    respond_to do |format|
      format.html { @rates = @parsed["rates"].keys }
      format.json { @rates = @parsed["rates"] }
    end
  end

end
