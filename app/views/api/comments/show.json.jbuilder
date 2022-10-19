json.set! @comment.id do
    json.extract! comment, :id, :body, :quiz_id, :commenter_id, :points, :updated_at
end