# json.set! @random_quiz.id do
#     json.merge! @random_quiz.attributes
#     json.iconUrl @random_quiz.icon.url
# end

json.randomQuiz do
    json @random_quiz.id
end

# json.set! @random_quiz.id do
#     json.partial! 'quiz', quiz: @random_quiz
#     json.iconUrl @random_quiz.icon.url
# end