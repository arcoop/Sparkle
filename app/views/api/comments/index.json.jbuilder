likes = []
json.comments do
    @comments.each do |comment|
        likes += comment.likes
        json.partial! 'api/comments/comment', comment: comment
    end
end

json.likes do
    likes.each do |like|
        json.set! like.id do
            json.merge! like.attributes
        end
    end
end

# @likes.each do |like|
#     json.set! like.id do
#         json.extract! like, :id, :liker_id, :like_type, :comment_id
#     end
# end
