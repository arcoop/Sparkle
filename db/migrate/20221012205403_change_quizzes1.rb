class ChangeQuizzes1 < ActiveRecord::Migration[7.0]
  def change
    rename_column :quizzes, :quiz_author_id, :author_id
  end
end
