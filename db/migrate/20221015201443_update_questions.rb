class UpdateQuestions < ActiveRecord::Migration[7.0]
  def change
    change_column_null :questions, :type, false
  end
end
