json.set! user.id do
    json.extract! user, :id, :email, :username, :city, :state_country, :bio, :created_at, :updated_at
    json.iconUrl user.icon.url
end