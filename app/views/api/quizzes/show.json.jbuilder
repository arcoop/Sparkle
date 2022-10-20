json.set! @quiz.id do
    json.partial! 'quiz', quiz: @quiz
    json.iconUrl @quiz.icon.url
end