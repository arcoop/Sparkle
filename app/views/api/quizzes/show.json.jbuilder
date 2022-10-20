json.set! @quiz.id do
    json.partial! 'quiz', quiz: @quiz
    p "icon"
    p @quiz.icon.url
    json.iconUrl @quiz.icon.url
end