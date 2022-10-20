class AddTimeToQuiz < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :time, :time
  end
end
