class Edittakerid < ActiveRecord::Migration[7.0]
  def change
    change_column_null :quiz_takes, :taker_id, true
  end
end
