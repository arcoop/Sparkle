class ChangeQuestions < ActiveRecord::Migration[7.0]
  def change
    rename_column :questions, :type, :question_type
  end
end
