# json.set! @quiz_take.id do
#     json.extract! @quiz_take, :taker_id, :quiz_id, :score, :time, :quiz, :taker, :created_at
# end

json.partial! 'api/quiz_takes/quiz_take', quiz_take: @quiz_take