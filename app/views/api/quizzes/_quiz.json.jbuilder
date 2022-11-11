json.set! quiz.id do
    json.extract! quiz, :id, :title, :quiz_type, :description, :quiz_timer, :takes, :comments, :max_score, :created_at, :updated_at
    json.author do
        json.authorUsername quiz.author.username
        json.authorId quiz.author_id
    end
    json.category do
        json.categoryName quiz.category.name
        json.categoryId quiz.category.id
    end
        
    json.iconUrl quiz.icon.url
end

