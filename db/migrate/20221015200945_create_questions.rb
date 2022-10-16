class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.text :body, null: false
      t.text :answer, null: false
      t.references :quiz, foreign_key: true

      t.timestamps
    end
  end
end
