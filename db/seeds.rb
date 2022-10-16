# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Question.destroy_all
    Quiz.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('quizzes')
    ApplicationRecord.connection.reset_pk_sequence!('questions')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'demo-user', 
      email: 'demo@demo.com', 
      password: 'demouser123'
    )

    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    puts "creating quizzes..."

    Quiz.create!(
      title: Faker::Lorem.question,
      quiz_type: "classic",
      description: Faker::Lorem.sentence,
      quiz_timer: Faker::Number.between(from: 1, to: 10),
      category: "History",
      author_id: 1
    ) 

    Quiz.create!(
      title: Faker::Lorem.question,
      quiz_type: "classic",
      description: Faker::Lorem.sentence,
      quiz_timer: Faker::Number.between(from: 1, to: 10),
      category: "Math",
      author_id: 1
    ) 

    5.times do 
      Quiz.create!({
        title: Faker::Lorem.question,
        quiz_type: "classic",
        description: Faker::Lorem.sentence,
        quiz_timer: Faker::Number.between(from: 1, to: 10),
        category: "Geography",
        author_id: 1
      }) 
    end

    puts 'creating questions...'
    
    Question.create!(
      body: "is this the question body?",
      answer: "this is the question answer!",
      quiz_id: 1,
      question_type: "true/false"
    )

    3.times do 
      Question.create!({
        body: Faker::Lorem.question,
        answer: Faker::Lorem.sentence,
        quiz_id: 1,
        question_type: "true/false"
      })
    end

    4.times do 
      Question.create!({
        body: Faker::Lorem.question,
        answer: Faker::Lorem.sentence,
        quiz_id: 2,
        question_type: "multiple choice"
      })
    end

  
    puts "Done!"
  end