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
    Comment.destroy_all
    Question.destroy_all
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
      title: Faker::Lorem.question,
      quiz_type: "classic",
      description: Faker::Lorem.sentence,
      quiz_timer: Faker::Number.between(from: 1, to: 10),
      category_id: 1,
      author_id: 1
    ) 

    Quiz.create!(
      title: "What does each letter in SPIREG stand for?",
      quiz_type: "classic",
      description: "Can you name all 6 words in under 1 minute?",
      quiz_timer: 1,
      category_id: 2,
      author_id: 2
    ) 

    5.times do 
      Quiz.create!({
        title: Faker::Lorem.question,
        quiz_type: "classic",
        description: Faker::Lorem.sentence,
        quiz_timer: Faker::Number.between(from: 1, to: 10),
        category_id: 5,
        author_id: 1
      }) 


    end

    puts "creating questions..."
    
    Question.create!(
      body: "S",
      answer: "self.find_by_credentials",
      quiz_id: 2,
      question_type: "short answer"
    )
    
    Question.create!(
      body: "P",
      answer: "password =",
      quiz_id: 2,
      question_type: "short answer"
    )
    Question.create!(
      body: "I",
      answer: "is password",
      quiz_id: 2,
      question_type: "short answer"
    )
    Question.create!(
      body: "R",
      answer: "reset session token",
      quiz_id: 2,
      question_type: "short answer"
    )
    Question.create!(
      body: "E",
      answer: "ensure session token",
      quiz_id: 2,
      question_type: "short answer"
    )

    Question.create!(
      body: "G",
      answer: "generate secure session token",
      quiz_id: 2,
      question_type: "short answer"
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
        quiz_id: 3,
        question_type: "multiple choice"
      })
    end

    p "creating comments..."
    
     Comment.create!(
      body: "Comment body",
      quiz_id: 1,
      commenter_id: 1
     )

     Comment.create!(
      body: "second comment body",
      quiz_id: 1,
      commenter_id: 1
     )

     Comment.create!(
      body: "another comment body",
      quiz_id: 2,
      commenter_id: 1
     )

     Comment.create!(
      body: " comment body again",
      quiz_id: 2,
      commenter_id: 2
     )

  
    puts "Done!"
  end