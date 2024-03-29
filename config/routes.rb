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
  get "currency", to: "pages#currency", as: 'currency'
  resources :payments, only: [:new, :create]

  resources :currencies, only: [:new, :create]
  resources :stores, only: [:index, :show, :new, :create, :edit, :update, :destroy]
  get "stores/render/:unique_code", to: "stores#render_store", as: "render_store"
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
