class UpdateLikesTable < ActiveRecord::Migration[7.0]
  def change
    rename_column :likes, :type, :like_type
  end
end
