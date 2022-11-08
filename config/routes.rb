Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index] do
      resources :quiz_takes, only: [:index]
      get 'total/quiz_takes', to: "quiz_takes#total"
    end
    resources :categories, only: [] do
      get "/quizzes", to: "quizzes#quizzes_by_category"
    end
    resources :quizzes, except: [:new, :edit] do
      resources :questions, only: [:index, :show]
      resources :comments, only: [:index]
      resources :quiz_takes, only: [:index]
      get 'total/quiz_takes', to: "quiz_takes#total"
    end
    resource :session, only: [:show, :create, :destroy]
    resources :questions, only: [:create, :update, :destroy]
    resources :comments, only: [:update, :destroy, :create] do
      resources :likes, only: [:index] 
    end
    resources :quiz_takes, only: [:create, :show]
    resources :likes, only: [:create, :update, :destroy]
    get '/search/quizzes', to: "quizzes#search"
    get '/search/users', to: "users#search"
    get '/random/quizzes', to: "quizzes#random"
    get 'total/quiz_takes', to: "quiz_takes#total"
  end


  get '*path', to: "static_pages#frontend_index"

end
