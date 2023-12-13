require 'net/http'
require 'uri'
require 'json'


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
    # if params[:transaction][:receiver].length == 3
    if params[:transaction][:rate].present?
      @transaction.sender = Wallet.find_by(currency: params[:transaction][:sender])
      @transaction.receiver = Wallet.find_by(currency: params[:transaction][:receiver])
      if @transaction.receiver.nil?
        @transaction.receiver = Wallet.create!(name: "Wallet n°#{Wallet.last.id + 1}", currency: params[:transaction][:receiver], balance: 0, user: current_user)
      end
      @transaction.accepted!
      @amount = params[:transaction][:amount].to_f
      @transaction.rate = params[:transaction][:rate]
      @transaction.sender.balance -= 1
      @transaction.sender.balance -= @amount
      @transaction.sender.save
      # @transaction.receiver.balance += @amount * @transaction.rate
      @transaction.receiver.balance += @amount * params[:transaction][:rate].to_f
      @transaction.receiver.save
    else
      @transaction.sender = Wallet.find(params[:transaction][:sender])
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
      if @transaction.status == "accepted"
        @transaction.sender.balance -= @transaction.amount
        @transaction.receiver.balance += @transaction.amount
        @transaction.sender.save
        @transaction.receiver.save
      end
      redirect_to exchange_path, notice: "Transaction accepted your balance is updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def proxy
    @transaction = Transaction.first
    authorize @transaction
    url = URI.parse("http://api.exchangeratesapi.io/v1/latest?access_key=#{params[:access_key]}&base=EUR&symbols=#{params[:currency]}")
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port) {|http|
    http.request(req)
    }
    render json: res.body
  end

  private

  def transaction_params
    params.require(:transaction).permit(:amount, :status, :rate)
  end
end
