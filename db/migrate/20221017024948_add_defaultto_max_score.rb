class AddDefaulttoMaxScore < ActiveRecord::Migration[7.0]
  def change
    change_column_default :quizzes, :max_score, 1
  end
end
