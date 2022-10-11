class CreateQuizzes < ActiveRecord::Migration[7.0]
  def change
    create_table :quizzes do |t|
      t.string :title, null: false, index: {unique: true} 
      t.string :quiz_type, null: false
      t.text :description, null: false
      t.integer :quiz_timer, null: false
      t.string :permalink
      t.string :answer_type
      t.string :hint_heading
      t.string :answer_heading
      t.string :extra_heading
      t.string :category, null: false
      t.references :quiz_author, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
