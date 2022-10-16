@quizzes.each do |quiz|
    json.set! quiz.id do
        json.extract! quiz, :id, :title, :quiz_type, :description, :quiz_timer, :permalink, :answer_type, :hint_heading, :answer_heading, :extra_heading, :category, :author_id, :created_at, :updated_at
    end
end