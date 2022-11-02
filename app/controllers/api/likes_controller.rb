class Api::LikesController < ApplicationController
    wrap_parameters include: Like.attribute_names + ['likerId', 'likeType', 'commentId']

    def create
        @like = Like.new(likes_params)
        if @like.save
            render 'api/likes/show'
        else
            p @like.errors.full_messages
            render json: {errors: @like.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        @like = Like.find(params[:id])
        if @like.update
            render 'api/likes/show'
        else
            render json: {errors: @like.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
         @like = Like.find(params[:id])
         @like.destroy
    end

    private
    def likes_params
        params.require(:like).permit(:liker_id, :like_type, :comment_id)
    end
end
