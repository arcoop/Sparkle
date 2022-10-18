class Api::QuizTakesController < ApplicationController
    def index 
        @quiz_takes = Quiz_Take.all
        render '/api/quiz_takes/index'
    end

    def create
        @quiz_take = Quiz_Take.new(quiz_takes_params)
        if @quiz_take.save
            render '/api/quiz_takes/show'
        else
            render json: {errors: @quiz_take.errors.full_messages}, status: :unprocessable_entity
        end
    end
    
    def show
        @quiz_take = Quiz_Take.find(params[:id])
        render '/api/quiz_takes/show'
    end

    private
    def quiz_takes_params 
        params.require(:quiz_takes).permit(:taker_id, :quiz_id, :score, :time)
    end

end
