@comments.each do |comment|
    json.set! comment.id do
        json.extract! comment, :id, :body, :quiz_id, :commenter_id, :points, :updated_at, :created_at
        num_likes = 0
        comment.likes.each do |like|
            if like.like_type
                num_likes += 1
            elsif like.like_type == false
                num_likes -=1
            end
        end
        json.numLikes num_likes
        if @current_user
            userLike = comment.likes.select { |like| like.liker_id == @current_user.id}
            if userLike.length >= 1 
                json.userLiked userLike[0]
            else
                json.userLiked false
            end
        else
            json.userLiked false
        end
    end
end

# @likes.each do |like|
#     json.set! like.id do
#         json.extract! like, :id, :liker_id, :like_type, :comment_id
#     end
# end