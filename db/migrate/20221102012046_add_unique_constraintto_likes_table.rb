class AddUniqueConstrainttoLikesTable < ActiveRecord::Migration[7.0]
  def change
    add_index :likes, [:liker_id, :comment_id], unique: true
  end
end
