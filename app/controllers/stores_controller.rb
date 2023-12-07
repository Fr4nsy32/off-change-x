class StoresController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_store, only: [:show, :edit, :update, :destroy]

  def index
    @stores = Store.all
    @stores = policy_scope(Store)
    @markers = Store.geocoded.map do |store|
      {
        lat: store.latitude,
        lng: store.longitude,
        info_window_html: render_to_string(partial: "info_window", locals: {store: store})
      }
    end
  end

  def show
    authorize @store
  end

  def new
    @store = current_user.stores.build
    authorize @store
  end

  def create
    @store = current_user.stores.build(store_params)
    authorize @store
    if @store.save
      redirect_to @store, notice: 'Store was successfully created.'
    else
      render :new
    end
  end

  def edit
    @store = Store.find(params[:id])
    authorize @store
  end

  def update
    current_user
    @store = Store.find(params[:id])
    authorize @store
    if @store.update(store_params)
      redirect_to @store, notice: 'Store was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    current_user
    @store = Store.find(params[:id])
    authorize @store
    @store.destroy
    redirect_to stores_path, notice: 'Store was successfully destroyed.'
  end

  private

  def set_store
    @store = Store.find(params[:id])
  end

  def store_params
    params.require(:store).permit(:name, :address)
  end

  def authorize_store_owner
    unless current_user == @store.user
      redirect_to root_path
    end
  end
end
