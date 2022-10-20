class EditTimeColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :quizzes, :time, :time
    add_column :quizzes, :time, :string
  end
end
