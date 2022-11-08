json.set! @quiz.id do
    json.partial! 'quiz', quiz: @quiz
    json.iconUrl @quiz.icon.url
end

# json.quizzes do
#     json.set! @quiz.id do
#         json.merge! @quiz.attributes
#         json.iconUrl @quiz.icon.url
#     end
# end

# json.randomQuiz do
#     json.set! @random_quiz.id do
#         json.merge! @random_quiz.attributes
#         json.iconUrl @random_quiz.icon.url
#     end
# end