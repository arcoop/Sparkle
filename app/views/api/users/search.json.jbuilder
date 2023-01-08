@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :email, :username, :city, :state_country, :bio :quizzes_authored, :comments_written, :quiz_takes, :quizzes_taken, :created_at, :updated_at
        json.iconUrl user.icon.url
    end
end