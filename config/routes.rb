Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  get "exchange", to: "pages#exchange", as: 'exchange'

  resources :payments, only: [:new, :create]
  %w(404 422 500 503).each do |code|
    get code, to: 'errors#show', params: { code: code }
  end
  resources :currencies, only: [:new, :create]
  resources :stores, only: [:index, :show, :new, :create, :edit, :update, :destroy]
  resources :transactions, only: [:new, :create, :edit, :update] do
    collection do
      post :proxy
    end
  end
  resources :wallets, only: [:index, :show, :new, :create, :edit, :update, :destroy] do
    member do
      patch 'set_main'
    end
  end
end
