class CreateQuizTakes < ActiveRecord::Migration[7.0]
  def change
    create_table :quiz_takes do |t|
      t.references :taker, foreign_key: {to_table: :users}
      t.references :quiz, foreign_key: true
      t.integer :score, default: 0
      t.integer :time

      t.timestamps
    end
  end
end
