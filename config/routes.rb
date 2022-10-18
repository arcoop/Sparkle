Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index]
    resources :categories, only: [:show, :index] do
      resources :quizzes, only: [:show, :index]
    end
    resources :quizzes, except: [:new, :edit] do
      resources :questions, only: [:index, :show]
      resources :comments, only: [:index]
    end
    resource :session, only: [:show, :create, :destroy]
    resources :questions, only: [:create, :update, :destroy]
    resources :comments, only: [:update, :destroy, :create]
    resources :quiz_takes, only: [:create, :show, :index]
  end

  get '*path', to: "static_pages#frontend_index"

end
