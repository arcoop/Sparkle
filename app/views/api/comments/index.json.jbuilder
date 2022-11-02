@comments.each do |comment|
    json.set! comment.id do
        json.extract! comment, :id, :body, :quiz_id, :commenter_id, :points, :updated_at, :created_at
        json.numLikes comment.likes.length
        if @current_user
            json.userLiked comment.likes.any? { |like| like.liker_id == @current_user.id}
        else
            json.userLiked false
        end
    end
end