class TransactionsController < ApplicationController
  def new
    current_user
    @transaction = Transaction.new
  end

  def create
    @transaction = Transaction.new(transaction_params)
    @transaction.sender = Wallet.find_by(user_id: current_user)
    @store = Store.find_by(unique_code: params[:transaction][:receiver])
    @transaction.receiver = @store.user.wallets.where(main: true).first
    if @transaction.save
      redirect_to exchange_path, notice: "Transaction was successfully created."

    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    current_user
    @transaction = Transaction.find(params[:id])
  end

  def update
    @transaction = Transaction.find(params[:id])
    if @transaction.update(transaction_params)
      redirect_to exchange_path, notice: "Transaction accepted your balance is updated."
    else
      render :edit, status: :unprocessable_entity
    end
    if @transaction.status == "accepted"
      @transaction.sender.balance -= @transaction.amount
      @transaction.receiver.balance += @transaction.amount
      @transaction.sender.save
      @transaction.receiver.save
    end

  end
  private

  def transaction_params
    params.require(:transaction).permit(:amount, :status)
  end
end
