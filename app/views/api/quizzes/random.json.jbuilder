# json.set! @random_quiz.id do
#     json.merge! @random_quiz.attributes
#     json.iconUrl @random_quiz.icon.url
# end

json.randomQuiz do
    json.id @random_quiz.id
end