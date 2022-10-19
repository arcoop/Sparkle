@quizzes.each do |quiz|
    json.set! quiz.id do
        json.extract! quiz, :id, :title, :quiz_type, :description, :quiz_timer, :permalink, :answer_type, :hint_heading, :max_score, :answer_heading, :extra_heading, :category_id, :author_id, :created_at, :updated_at
        json.icon quiz.icon.url
    end
end