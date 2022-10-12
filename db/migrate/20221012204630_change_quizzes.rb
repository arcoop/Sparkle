class ChangeQuizzes < ActiveRecord::Migration[7.0]
  def change
    change_column_null :quizzes, :description, true
    change_column_null :quizzes, :quiz_timer, true
    change_column_null :quizzes, :answer_type, true
    change_column_null :quizzes, :category, true
  end
end
