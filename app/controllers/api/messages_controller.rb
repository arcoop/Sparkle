class Api::MessagesController < ApplicationController
    before_action :require_logged_in

    def create
        @message = Message.new(message_params)

        if @message.save
            RoomsChannel.broadcast_to(@message.room, @message)
            render :show, locals: {message: @message}
        else
            render json: @message.erros.full_messages, status: 422
        end

    end

    private

    def message_params
        params.require(:message).permit(:body, :room_id, :author_id)
    end
end