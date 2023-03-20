class LiveChatChannel < ApplicationCable::Channel
    def subsribed
        # stream_from "fun_stream_name"
        room = Room.find_by(id: params[:id])om
        stream_for room
    end
end