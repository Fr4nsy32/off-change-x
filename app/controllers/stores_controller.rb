class StoresController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show, :render_store]
  before_action :set_store, only: [ :show, :edit, :update, :destroy]
  before_action :authorize_store_owner, only: [:edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  def index
    @stores = Store.all
    @stores = policy_scope(Store)
    @markers = @stores.geocoded.map do |store|
      {
        lat: store.latitude,
        lng: store.longitude,
        info_window_html: render_to_string(partial: "info_window", locals: { store: store }),
        marker_html: render_to_string(partial: "marker", locals: { store: store })
      }
    end
    if params[:place].present?
      @stores = Store.near(params[:place], params[:distance] || 10)
    @markers = @stores.geocoded.map do |store|
      {
        lat: store.latitude,
        lng: store.longitude,
        info_window_html: render_to_string(partial: "info_window", locals: { store: store }),
        marker_html: render_to_string(partial: "marker", locals: { store: store })
      }
    end
    end
    respond_to do |format|
      format.json
      format.html
    end
  end

  def show
    authorize @store
    # Actions pour la vue show
  end

  def render_store
    @store = Store.find_by(unique_code: params[:unique_code].to_s)
    authorize @store
    render json: @store

  end
  def new
    @store = current_user.stores.build
    authorize @store
  end

  def create
    @store = current_user.stores.build(store_params)
    authorize @store
    # S'assurer que le unique_code est généré
    @store.unique_code = SecureRandom.hex(3) unless @store.unique_code.present?
    if @store.save
      redirect_to @store, notice: 'Store was successfully created.'
    else
      render :new, status: :unprocessable_entity
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
    params.require(:store).permit(:name, :address, :opening_time, :closing_time, :max_cash)
  end

  def authorize_store_owner
    unless current_user == @store.user
      redirect_to root_path, alert: "You are not authorized to perform this action."
    end
  end
end
