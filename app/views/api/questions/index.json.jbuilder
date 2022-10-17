@questions.each do |question|
    json.set! question.id do
        json.extract! question, :id, :body, :answer, :question_type, :quiz_id, :created_at, :updated_at
    end
end