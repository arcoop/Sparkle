class UpdateQuestionsTable < ActiveRecord::Migration[7.0]
  def change
    remove_column :questions, :question_type, :string
  end
end
