Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/home", to: "homes#index"
  get "/styleguide", to: "homes#index"
  get "/users/:id", to: "homes#index"
  get "/login", to: "homes#index"

  namespace :api do
    namespace :v1 do
      get "/users/check_for_user", to: "/api/v1/users#check_for_user"
      post "/users/sign_in_user", to: "/api/v1/users#sign_in_user"
      delete "users/sign_out_user", to: "/api/v1/users#sign_out_user"
      resources :users, only: [:show, :create]
      resources :jokes, only: [:index, :create, :update, :destroy]
      resources :comments, only: [:create, :update, :destroy]
      resources :ratings, only: [:create, :update, :destroy]
    end
  end
end
