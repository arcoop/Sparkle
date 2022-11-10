json.array! @sorted_quiz_takes.each do |quiz|
    json.id quiz.id
    json.title quiz.title
end