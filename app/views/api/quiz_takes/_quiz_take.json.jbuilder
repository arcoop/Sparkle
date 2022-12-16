json.set! quiz_take.id do
    # json.merge! quiz_take.attributes
    json.extract! quiz_take, :id, :taker_id, :quiz_id, :score, :time, :created_at, :updated_at
    json.quiz do 
        json.quizTitle quiz_take.quiz.title
        json.quizId quiz_take.quiz.id
    end
end