class EditComments < ActiveRecord::Migration[7.0]
  def change
    change_column_default :comments, :points, 1
  end
end
