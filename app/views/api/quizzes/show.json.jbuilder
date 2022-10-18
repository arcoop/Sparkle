json.set! @quiz.id do
    json.partial! 'quiz', quiz: @quiz
    json.icon @quiz.icon.url
end