class Api::QuestionsController < ApplicationController
    wrap_parameters include: Quiz.attribute_names + ['quizId', 'body', 'answer'] 
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
        if @question.save
            render 'api/questions/show'
        else
            render json: {errors: @question.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        @question = Question.find(params[:id])
        if (@question.update(question_params))
            render 'api/questions/show'
        else
            render json: {errors: @question.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        @question = Question.find(params[:id])
        @question.destroy
        # @questions = Quiz.find(params[:quiz_id]).questions
        # render 'api/questions/index'
    end


    private
    def question_params
        params.require(:question).permit(:id, :body, :answer, :quiz_id,)
    end

end
