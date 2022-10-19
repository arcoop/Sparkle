@quizzes.each do |quiz|
    p @quizzes
    json.set! quiz.id do
        json.extract! quiz, :id, :title, :quiz_type, :description, :quiz_timer, :permalink, :answer_type, :hint_heading, :answer_heading, :extra_heading, :category_id, :author_id, :created_at, :updated_at
        json.iconUrl quiz.icon.url
    end
end