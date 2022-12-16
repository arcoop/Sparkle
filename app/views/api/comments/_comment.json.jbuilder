json.set! comment.id do
    json.extract! comment, :id, :body, :quiz_id, :points, :quiz, :created_at, :updated_at
    json.commenter do 
        json.commenterUsername comment.commenter.username
        json.commenterId comment.commenter_id
    end
end
