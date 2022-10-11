@quizzes.each do |quiz|
    json.set! quiz.id do
        json.partial! 'quiz', quiz: quiz
    end
end