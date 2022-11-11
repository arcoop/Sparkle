@quizzes.each do |quiz|
    json.set! quiz.id do
        json.partial! 'api/quizzes/quiz', quiz: quiz
    end
end