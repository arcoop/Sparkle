@quiz_takes.each do |quiz_take|
    json.set! quiz_take.id do
        json.extract! quiz_take, :taker_id, :quiz_id, :score, :time, :created_at
    end
end