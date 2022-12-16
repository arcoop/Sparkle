class Api::QuizTakesController < ApplicationController
    wrap_parameters include: QuizTake.attribute_names + ['takerId', 'quizId', 'quizTake', 'createdAt']

    def index 
        if params[:quiz_id]
            @quiz_takes = QuizTake.where(quiz_id: params[:quiz_id])
        elsif params[:user_id] 
            @quiz_takes = QuizTake.where(taker_id: params[:user_id])
        else
            @quiz_takes = QuizTake.all.order(created_at: :desc).limit(5)
        end
        render '/api/quiz_takes/index'
    end
    
    def recent_takes
        if params[:quiz_id]
            @quiz_takes = QuizTake.where(quiz_id: params[:quiz_id]).limit(5)
        elsif params[:user_id] 
            @quiz_takes = QuizTake.where(taker_id: params[:user_id]).order(created_at: :desc).limit(5)
        else
            @quiz_takes = QuizTake.all.order(created_at: :desc).limit(5)
        end
        render '/api/quiz_takes/recent_takes'
    end

    def total
        @quiz_takes = QuizTake.all
        render '/api/quiz_takes/total'
    end

    def total_user_quiz
        if params[:quiz_id]
            @quiz_takes = QuizTake.where(quiz_id: params[:quiz_id])
        elsif params[:user_id] 
            @quiz_takes = QuizTake.where(taker_id: params[:user_id])
        end
        render '/api/quiz_takes/total_user_quiz'
    end

    def sorted
        quiz_takes = QuizTake.group(:quiz).order(count: :desc).count
        @sorted_quiz_takes = quiz_takes.keys
        render 'api/quiz_takes/sorted'
    end

    def create
        p 'creating take'
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
        params.require(:quiz_take).permit(:taker_id, :quiz_id, :quiz, :score, :time, :created_at)
    end

end
