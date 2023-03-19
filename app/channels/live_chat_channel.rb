class LiveChatChannel < ApplicationCable::Channel
    def subsribed
        # stream_from "fun_stream_name"
        # stream_for Room.find_by(id: params[:id])
    end
end