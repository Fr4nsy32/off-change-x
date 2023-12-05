class TransactionsController < ApplicationController
  def new
    @transaction = Transaction.new
  end

  def create
    @sender_wallets = Wallet.where(user_id: current_user)
    @receiver_wallets = Wallet.where.not(user_id: @current_user.id)
  end
end
