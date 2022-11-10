@quiz_takes.each do |quiz_take|
    json.set! quiz_take.id do
        json.extract! quiz_take, :taker_id, :quiz_id, :score, :time, :quiz, :taker, :created_at
    end
end



json.array! @quiz_takes.each do |quiz|
    json.id quiz.id
    json.title quiz.title
end