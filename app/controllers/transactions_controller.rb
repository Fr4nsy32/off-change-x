class TransactionsController < ApplicationController
  def new
    current_user
    @transaction = Transaction.new
  end

  def create
    @transaction = Transaction.new(transaction_params)
    # @wallet = Wallet.where(user_id: @current_user)
    @transaction.sender = Wallet.find_by(user_id: current_user)
    raise
    # @transaction.receiver_id = params(:receiver_id)
    # @transaction.receiver_id = Wallet.find(params[:receiver_id])
    @transaction.save
    # @receiver_wallets = Wallet.where.not(user_id: @current_user.id)
  end

  private

  def transaction_params
    params.require(:transaction).permit(:amount)
  end
end
