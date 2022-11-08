class Api::QuizzesController < ApplicationController
    wrap_parameters include: Quiz.attribute_names + ['quizType', 'categoryId', 'icon'] 
    before_action :find_quiz, only: [:show, :update, :destroy]

    def index
        @quizzes = Quiz.all
        
        render 'api/quizzes/index'
    end

    def quizzes_by_category 
        @quizzes = Quiz.where(category_id: params[:category_id])

        render 'api/quizzes/quizzes_by_category'
    end

    def random 
        quizzes = Quiz.all
        p quizzes
        idx = rand(0...quizzes.length)
        @random_quiz = quizzes[idx]
        render 'api/quizzes/random'
    end

    def search
        query = "%#{params[:s]}%"
        @quizzes = Quiz.where("lower(title) LIKE ?", query.downcase)
        # .or(Quiz.where("author.username LIKE ?", query))
        render 'api/quizzes/search'
    end

    def show
        render 'api/quizzes/show'
    end
    
    def create
        p "inside create"
        @quiz = Quiz.new(quiz_params)
        @quiz.author = current_user
        if @quiz.save
            render 'api/quizzes/show'
        else
            render json: {errors: @quiz.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        if @quiz.update(quiz_params)
            render 'api/quizzes/show'
        else
            p @quiz.errors.full_messages
            render json: {errors: @quiz.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        @quiz.destroy
        @quizzes = Quiz.all

        render :index
    end

    private
    def find_quiz
        p "start of find quiz"
        if params[:id] != "undefined"
            @quiz = Quiz.find(params[:id])
        else
            @quiz = Quiz.find(quiz_params[:id])
        end
        p "end of find quiz"
    end

    def quiz_params
        params.require(:quiz).permit(:id, :author, :title, :quiz_type, :description, :quiz_timer, :permalink, :answer_type, :hint_heading, :answer_heading, :extra_heading, :category_id, :icon, :created_at, :updated_at, :s)
    end

end
