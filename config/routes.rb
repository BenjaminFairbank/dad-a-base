Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  unauthenticated :user do
    root to: "devise/sessions#new"
  end

  get "/home", to: "homes#index"
  get "/styleguide", to: "homes#index"

  namespace :api do
    namespace :v1 do
      resources :jokes, only: [:index, :create]
      resources :comments, only: [:create, :update, :destroy]
      resources :ratings, only: [:create, :update]
    end
  end
end
