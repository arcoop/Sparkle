class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.text :body
      t.references :quiz, foreign_key: true
      t.references :commenter, foreign_key: {to_table: :users}
      t.integer :points

      t.timestamps
    end
  end
end
