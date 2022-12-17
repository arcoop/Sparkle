json.set! user.id do
    json.extract! user, :id, :email, :username, :created_at, :updated_at
    json.iconUrl user.icon.url
end

# json.set! user.id do
#     json.extract! user, :id, :email, :username, :quizzes_authored, :comments_written, :quiz_takes, :quizzes_taken, :created_at, :updated_at
#     json.iconUrl user.icon.url
# end