class Api::RoomsController < ApplicationController
    before_action :require_logged_in

    def index
        @rooms = Room.include(:owner).all
    end

    def show
        @room = Room.includes(messages: [:author, :mentioned_users]).find(params[:id])
    end
end
