json.quiz do
    json.extract! @quiz, :id, :title, :quiz_type, :description, :quiz_timer, :permalink, :answer_type, :hint_heading, :answer_heading, :extra_heading, :category, :quiz_author_id
end