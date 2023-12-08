class WalletsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_wallet, only: [:show, :destroy]

  def index
    @wallets = Wallet.all
    @wallets = current_user.wallets
    @wallets = policy_scope(current_user.wallets)
  end

  def show
    @wallet = Wallet.find(params[:id])
    authorize @wallet
  end

  def new
    current_user
    @wallet = Wallet.new
    authorize @wallet
  end

  def create
    @wallet = Wallet.new(wallet_params)
    @wallet.user = current_user
    authorize @wallet
    if @wallet.save
      redirect_to @wallet, notice: "Wallet was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    current_user
    @wallet = Wallet.find(params[:id])
    authorize @wallet
  end

  def update
    current_user
    @wallet = Wallet.find(params[:id])
    authorize @wallet
    if @wallet.update(wallet_params)
      redirect_to @wallet, notice: "Wallet was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    current_user
    @wallet = Wallet.find(params[:id])
    authorize @wallet
    @wallet.destroy
    redirect_to wallets_path, notice: "Wallet was successfully destroyed."
  end

  private

  def wallet_params
    params.require(:wallet).permit(:name, :currency, :main)
  end

  def set_wallet
    @wallet = current_user.wallets.find_by(id: params[:id])
    redirect_to(wallets_path, alert: "You can only see your wallets.") if @wallet.nil?
  end


  def set_main
    @wallet.update(main: true)
    redirect_to wallet_path(@wallet), notice: 'Wallet set as main.'
  end
end
