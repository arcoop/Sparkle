@comments.each do |comment|
    json.set! comment.id do
        json.extract! comment, :id, :body, :quiz_id, :commenter_id, :points, :quiz, :updated_at, :created_at
    end
end