class Api::CommentsController < ApplicationController
    wrap_parameters include: Comment.attribute_names + ['commenterId','quizId','points', 'updatedAt']
    def index
        @likes = []
        @comments = Comment.where(quiz_id: params[:quiz_id])
        @comments.each { |comment| @likes.push(comment.likes) }
        render '/api/comments/index'
    end

    def create
        @comment = Comment.new(comment_params)    
        if @comment.save
            @comments = Quiz.find(params[:quiz_id]).comments
            render '/api/comments/index'
        else
            render json: {errors: ['You cannot submit an empty comment']}, status: :unprocessable_entity
        end
    end

    def update
        @comment = Comment.find(params[:id])
        if @comment.update(comment_params)
            @comments = Quiz.find(params[:quiz_id]).comments
            render '/api/comments/index'
        else
            render json: {errors: @comment.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy 
        @comment = Comment.find(params[:id])
        quizId = @comment.quiz_id
        @comment.destroy
        @comments = Quiz.find(quizId).comments
        render 'api/comments/index'
    end

    private
    def comment_params
        params.require(:comment).permit(:id, :body, :quiz_id, :commenter_id, :points, :updated_at)
    end

end
