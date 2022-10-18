class ChangeCategoryinQuiz < ActiveRecord::Migration[7.0]
  def change
    remove_column :quizzes, :category, :string
    add_reference :quizzes, :category, foreign_key: true
  end
end
