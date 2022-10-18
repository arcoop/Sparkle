class AddNullFalsetoCategory < ActiveRecord::Migration[7.0]
  def change
    change_column_null :categories, :name, true
  end
end
