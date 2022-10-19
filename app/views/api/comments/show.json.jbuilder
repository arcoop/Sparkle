json.set! @comment.id do
    json.extract! comment, :id, :body, :quiz_id, :commenter_id, :points, :quiz, :updated_at
end