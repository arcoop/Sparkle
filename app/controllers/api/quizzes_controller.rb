class Api::QuizzesController < ApplicationController
    wrap_parameters include: Quiz.attribute_names + ['quizType']
    before_action :find_quiz, only: [:show, :update, :destroy]

    def index
        @quizzes = Quiz.all
        
        render 'api/quizzes/index'
    end

    def show
        render 'api/quizzes/show'
    end
    
    def create
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
        @quiz = Quiz.find(params[:id])
    end

    def quiz_params
        params.require(:quiz).permit(:id, :title, :quiz_type, :description, :quiz_timer, :permalink, :answer_type, :hint_heading, :answer_heading, :extra_heading, :category_id, :created_at, :updated_at)
    end

end
