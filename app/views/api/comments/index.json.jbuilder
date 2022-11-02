@comments.each do |comment|
    json.set! comment.id do
        json.extract! comment, :id, :body, :quiz_id, :commenter_id, :points, :updated_at, :created_at
    end
end

# @likes.each do |like|
#     json.set! like.id do
#         json.extract! like, :id, :liker_id, :like_type, :comment_id
#     end
# end