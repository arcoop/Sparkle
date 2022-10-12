json.set! @quiz.id do
    json.partial! 'quiz', quiz: @quiz
end