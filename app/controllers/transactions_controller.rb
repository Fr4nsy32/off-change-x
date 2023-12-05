class TransactionsController < ApplicationController
  def new
    current_user
    @transaction = Transaction.new
  end

  def create
    @transaction = Transaction.new(transaction_params)
    @transaction.sender_id = Wallet.where(user_id: @current_user)
    @transaction.receiver_id = params(:transaction['receiver_id'])
    # @transaction.receiver_id = Wallet.find(params[:receiver_id])
    raise
    @transaction.save
    # @receiver_wallets = Wallet.where.not(user_id: @current_user.id)
  end

  private

  def transaction_params
    params.require(:transaction).permit(:amount, :sender_id, :receiver_id)
  end
end
