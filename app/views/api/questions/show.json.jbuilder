json.set! @question.id do
    json.extract! question, :id, :body, :answer, :question_type, :quiz_id
end