class Api::QuizzesController < ApplicationController
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
        if @quiz.save
            render 'api/quizzes/show'
        else
            p @quiz
            render json: {errors: @quiz.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        if @quiz.save
            render 'api/quizzes/show'
        else
            render json: {errors: @quiz.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        @quiz.destroy
        render 'api/quizzes'
    end

    private
    def find_quiz
        @quiz = quiz.find(params[:id])
    end

    def quiz_params
        params.require(:quiz).permit(:title, :quiz_type, :description, :quiz_timer, :permalink, :answer_type, :hint_heading, :answer_heading, :extra_heading, :category, :quiz_author_id)
    end

end
