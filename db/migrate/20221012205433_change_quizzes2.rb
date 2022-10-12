class ChangeQuizzes2 < ActiveRecord::Migration[7.0]
  def change
    change_column_null :quizzes, :author_id, false
  end
end
