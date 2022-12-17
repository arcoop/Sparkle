Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index] do
      resources :quiz_takes, only: [:index]
      get 'total/quiz_takes_user_quiz', to: "quiz_takes#total_user_quiz"
      get 'recent_takes/quiz_takes', to: "quiz_takes#recent_takes"
      get 'num_authored/quizzes', to: "quizzes#num_authored"
    end
    # resources :categories, only: [] do
    #   get "/quizzes", to: "quizzes#quizzes_by_category"
    # end
    resources :quizzes, except: [:new, :edit] do
      resources :questions, only: [:index, :show]
      resources :comments, only: [:index]
      resources :quiz_takes, only: [:index]
      get 'total/quiz_takes', to: "quiz_takes#total"
      get 'total/quiz_takes_user_quiz', to: "quiz_takes#total_user_quiz"
    end
    resources :categories, only: [:index]
    resource :session, only: [:show, :create, :destroy]
    resources :questions, only: [:create, :update, :destroy]
    resources :comments, only: [:update, :destroy, :create] do
      resources :likes, only: [:index] 
    end
    resources :quiz_takes, only: [:create, :show, :index]
    resources :likes, only: [:create, :update, :destroy]
    get '/search/quizzes', to: "quizzes#search"
    get '/search/users', to: "users#search"
    get '/random/quizzes', to: "quizzes#random"
    get 'total/quiz_takes', to: "quiz_takes#total"
    get 'sorted/quiz_takes', to: "quiz_takes#sorted"
    get 'categories/:name', to: "categories#show", as: :category
    get "/categories/:name/quizzes", to: "quizzes#quizzes_by_category", as: :category_quizzes
    
  end


  get '*path', to: "static_pages#frontend_index"

end
