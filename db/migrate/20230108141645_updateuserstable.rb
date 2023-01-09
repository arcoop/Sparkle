class Updateuserstable < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :city, :string
    add_column :users, :state_country, :string
    add_column :users, :bio, :text
  end
end
