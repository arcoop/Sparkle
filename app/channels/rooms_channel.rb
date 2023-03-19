class RoomsChannel < ApplicationCable::Channel
    def subscribed
      @room = Room.find_by(id: params[:id])
      stream_for @room
    end
  end