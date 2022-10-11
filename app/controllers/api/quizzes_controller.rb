class Api::QuizzesController < ApplicationController
    def index
        @quizzes = Quiz.all
        render 'api/quizzes'
    end

    def show
        @quiz = Quiz.find(params[:id])
        render 'api/quizzes/show'
    end
    
    def create
        @quiz = Quiz.new(quiz_params)
        if @quiz.save
            render 'api/quizzes/show'
        else
            render json: {errors: @quiz.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
    end

    def destroy
        @quiz = Quiz.find(params[:id])
        @quiz.destroy
        render 'api/quizzes'
    end

    private
    def quiz_params
        params.require(:quiz).permit(:id, :title, :quiz_type, :description, :quiz_timer, :permalink, :answer_type, :hint_heading, :answer_heading, :extra_heading, :category)
    end

end
