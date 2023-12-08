class TransactionsController < ApplicationController
  skip_after_action :verify_policy_scoped, only: [:index], raise: false

  def new
    current_user
    @transaction = Transaction.new
    authorize @transaction
  end

  def create
    # raise
    current_user
    @transaction = Transaction.new(transaction_params)
    authorize @transaction
    if params[:transaction][:receiver].length == 3
      @transaction.sender = Wallet.find_by(currency: params[:transaction][:sender])
      @transaction.receiver = Wallet.find_by(currency: params[:transaction][:receiver])
      if @transaction.receiver.nil?
        @transaction.receiver = Wallet.create!(name: params[:transaction][:receiver], currency: params[:transaction][:receiver], balance: 0, user: current_user)
      end
      @transaction.accepted!
      @amount = params[:transaction][:amount].to_f
      @transaction.sender.balance -= 1
      @transaction.sender.balance -= @amount
      @transaction.sender.save
      @transaction.receiver.balance += @amount * params[:transaction][:rate].to_f
      @transaction.receiver.save
    else
      @transaction.sender = Wallet.find_by(user_id: current_user)
      @store = Store.find_by(unique_code: params[:transaction][:receiver])
      @transaction.receiver = @store.user.wallets.where(main: true).first
    end

    if @transaction.save
      redirect_to wallets_path, notice: "Transaction was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    current_user
    @transaction = Transaction.find(params[:id])
    redirect_to wallets_path unless authorize @transaction
  end

  def update
    @transaction = Transaction.find(params[:id])
    authorize @transaction
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
    params.require(:transaction).permit(:amount, :status, :rate)
  end
end
