json.sortedQuizTakes do
    json.array! @sorted_quiz_takes.each do |quiz_id|
        json.id quiz_id
    end
end