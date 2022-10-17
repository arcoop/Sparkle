class AddMaxScoretoQuiz < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :max_score, :integer
  end
end
