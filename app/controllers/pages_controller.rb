class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :exchange]

  def home

  end

  def exchange
    current_user
    @wallets = Wallet.where(user_id: current_user)
    amount = params[:amount].to_f
    @transaction = Transaction.new
    # @transaction.amount = amount
    # @transaction.sender = params[:sender]
    # @transaction.receiver = params[:receiver]
    # raise
    # @transaction.save
    # source_currency = params[:source_currency]
    # target_currency = params[:target_currency]
    # exchange_rate = 1.0

    # converted_amount = amount * exchange_rate

    # @result = {
    #   amount: amount,
    #   source_currency: source_currency,
    #   target_currency: target_currency,
    #   exchange_rate: exchange_rate,
    #   converted_amount: converted_amount
    # }
  end

end
