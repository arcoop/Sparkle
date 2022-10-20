json.set! @question.id do
    json.extract! @question, :id, :body, :answer, :quiz_id, :created_at, :updated_at
end