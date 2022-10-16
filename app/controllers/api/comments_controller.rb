class Api::CommentsController < ApplicationController
    def index
        @comments = Quiz.find(params[:quiz_id]).comments
        render 'api/comments/index'
    end

    def create
        @comment = Comment.new(comment_params)
        @comment.quiz_id = params[:quiz_id]
        @comment.commenter_id = current_user

        if @comment.save
            @comments = Quiz.find(params[:quiz_id]).comments
            render 'api/comments/index'
        else
            render json: {errors: ['You cannot submit an empty comment']}, status: :unprocessable_entity
        end
    end

    def update
        @comment = Comment.find(params[:id])
        if @comment.update(comment_params)
            @comments = Quiz.find(params[:quiz_id]).comments
            render 'api/comments/index'
        else
            render json: {errors: @comment.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy 
        @comment = Comment.find(params:[:id])
        @comment.destroy
        @comments = Quiz.find(params[:quiz_id]).comments
        render 'api/comments/index'
    end

    private
    def find_comment
    end

    def comment_params
        params.require(:comment).permit(:body)
    end

end
