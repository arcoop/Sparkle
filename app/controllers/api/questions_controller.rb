class Api::QuestionsController < ApplicationController
    def index 
        @questions = Quiz.find(params[:quiz_id]).questions
        render 'api/questions/index'
    end

    def show
        @question = Question.find(params[:id])
        render 'api/questions/show'
    end
    
    def create
        @question = Question.new(question_params)
        if !@question.save
            render json: {errors: @question.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        @question = Question.find(params[:id])
        if !@question.update
            render json: {errors: @question.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        @question = Question.find(params[:id])
        @question.destroy
    end


    private
    def question_params
        params.require(:question).permit(:body, :answer, :question_type)
    end

end
