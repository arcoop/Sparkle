@quiz_takes.each do |quiz_take|
    json.partial! 'api/quiz_takes/quiz_take', quiz_take: quiz_take
end