# json.quizzes do
    @quizzes.each do |quiz|
        json.set! quiz.id do
            json.extract! quiz, :id, :title, :quiz_type, :description, :quiz_timer, :takes, :comments, :max_score, :category_id, :category, :author_id, :author, :created_at, :updated_at
            json.iconUrl quiz.icon.url
        end
    end
# end

# json.randomQuiz do
#     json.set! @random_quiz.id do
#         json.merge! @random_quiz.attributes
#         json.iconUrl @random_quiz.icon.url
#     end
# end


