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
    Comment.destroy_all
    Quiz.destroy_all
    Category.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('quizzes')
    ApplicationRecord.connection.reset_pk_sequence!('questions')
    ApplicationRecord.connection.reset_pk_sequence!('comments')
    ApplicationRecord.connection.reset_pk_sequence!('categories')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'demo-user', 
      email: 'demo@demo.com', 
      password: 'demouser123'
    )

    User.create!(
      username: 'arc',
      email: 'arc@email.com',
      password: 'password'
    )

    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    puts "creating categories..."
    CATS = ['Entertainment', 'Gaming', 'Geography', 'History', 'Holiday', 'Just For Fun', 'Language', 'Literature', 'Miscellaneous', 'Movies', 'Music', 'Religious', 'Science', 'Sports', 'Television']
    CATS.each do |cat|
      Category.create!(
        name: cat
      )
    end


    puts "creating quizzes..."

    Quiz.create!(
      title: "What does each letter in SPIREG stand for?",
      quiz_type: "classic",
      description: "Can you name all 6 words in under 1 minute?",
      quiz_timer: 1,
      category_id: 6,
      author_id: 2,
      max_score: 6
    ) 

    Quiz.create!(
      title: "Can you name every borough of New York City?",
      quiz_type: "classic",
      quiz_timer: 1,
      category_id: 3,
      author_id: 1,
      max_score: 5
    )

    Quiz.create!(
      title: "Can you name the original 8 Monopoly pieces?",
      quiz_type: "classic",
      quiz_timer: 3,
      category_id: 2,
      author_id: 2
    )

    Quiz.create! (
      title: "Can you name the original 8 Monopoly pieces?",
      quiz_type: "classic",
      quiz_timer: 3,
      category_id: 1,
      author_id: 2
    )

    end

    puts "creating questions..."

    Question.create! (
      body: "1",
      answer: "cannon",
      quiz_id: 3,
    )

    Question.create! (
      body: "2",
      answer: "thimble",
      quiz_id: 3,
    )

    Question.create! (
      body: "3",
      answer: "top hat",
      quiz_id: 3,
    )

    Question.create! (
      body: "4",
      answer: "iron",
      quiz_id: 3,
    )

    Question.create! (
      body: "5",
      answer: "battleship",
      quiz_id: 3,
    )

    Question.create! (
      body: "6",
      answer: "boot",
      quiz_id: 3,
    )

    Question.create! (
      body: "7",
      answer: "racecar",
      quiz_id: 3,
    )

    Question.create! (
      body: "8",
      answer: "purse",
      quiz_id: 3,
    )

    
    Question.create!(
      body: "S",
      answer: "self.find_by_credentials",
      quiz_id: 1,
    )
    
    Question.create!(
      body: "P",
      answer: "password=",
      quiz_id: 1,
      
    )
    Question.create!(
      body: "I",
      answer: "is_password",
      quiz_id: 1,
      
    )
    Question.create!(
      body: "R",
      answer: "reset_session_token",
      quiz_id: 1,
      
    )
    Question.create!(
      body: "E",
      answer: "ensure_session_token",
      quiz_id: 1,
      
    )

    Question.create!(
      body: "G",
      answer: "generate_secure_session_token",
      quiz_id: 1,
      
    )
  
    items = [["1", "Manhattan"], ["2","Brooklyn"], ["3", "Staten Island"], ["4","Queens"], ["5", "Bronx"]]
    items.each do |item|
      Question.create!({
        body: item[0], 
        answer: item[1],
        quiz_id: 2,
        
      })
    end

    3.times do 
      Question.create!({
        body: Faker::Lorem.question,
        answer: Faker::Lorem.sentence,
        quiz_id: 5,
      })
    end

    4.times do 
      Question.create!({
        body: Faker::Lorem.question,
        answer: Faker::Lorem.sentence,
        quiz_id: 4,
      })
    end

    p "creating comments..."
    
     Comment.create!(
      body: "Great Quiz!",
      quiz_id: 1,
      commenter_id: 1
     )

     Comment.create!(
      body: "Agree, I love this quiz!",
      quiz_id: 1,
      commenter_id: 2
     )

     Comment.create!(
      body: "I really enjoyed this but think there should be more time.",
      quiz_id: 2,
      commenter_id: 1
     )

     Comment.create!(
      body: "This was the perfect quiz.",
      quiz_id: 2,
      commenter_id: 2
     )

  
    puts "Done!"
  end