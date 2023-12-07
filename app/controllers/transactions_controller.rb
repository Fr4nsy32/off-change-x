class TransactionsController < ApplicationController
  def new
    current_user
    @transaction = Transaction.new
  end

  def create
    current_user
    @transaction = Transaction.new(transaction_params)
    @transaction.sender = Wallet.find_by(currency: params[:transaction][:sender])

    if params[:action] == 'exchange'
      @transaction.receiver = Wallet.find_by(currency: params[:transaction][:receiver])
    else
      @transaction.receiver = Wallet.find_by(currency: params[:transaction][:receiver])
    end

    @transaction.accepted!
    @amount = params[:transaction][:amount].to_f
    @transaction.sender.balance -= @amount * 1.12
    @transaction.sender.save
    @transaction.receiver.balance += @amount * 1.12
    @transaction.receiver.save

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
