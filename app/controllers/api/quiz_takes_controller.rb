class Api::QuizTakesController < ApplicationController
    wrap_parameters include: QuizTake.attribute_names + ['takerId', 'quizId', 'quizTake', 'createdAt']

    def index 
        if params[:quiz_id]
            @quiz_takes = QuizTake.where(quiz_id: params[:quiz_id])
        elsif params[:user_id] 
            @quiz_takes = QuizTake.where(taker_id: params[:user_id])
        end
        render '/api/quiz_takes/index'
    end

    def total
        if params[:quiz_id]
            @quiz_takes = QuizTake.where(quiz_id: params[:quiz_id])
        elsif params[:user_id] 
            @quiz_takes = QuizTake.where(taker_id: params[:user_id])
        else
            @quiz_takes = QuizTake.all
        end
        render '/api/quiz_takes/total'
    end

    def create
        @quiz_take = QuizTake.new(quiz_takes_params)
        if @quiz_take.save
            render '/api/quiz_takes/show'
        else
            p @quiz_take.errors.full_messages
            render json: {errors: @quiz_take.errors.full_messages}, status: :unprocessable_entity
        end
    end
    
    def show
        @quiz_take = QuizTake.find(params[:id])
        render '/api/quiz_takes/show'
    end

    private
    def quiz_takes_params 
        params.require(:quiz_take).permit(:taker_id, :quiz_id, :score, :time, :created_at)
    end

end
