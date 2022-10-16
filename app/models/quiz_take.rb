# == Schema Information
#
# Table name: quiz_takes
#
#  id         :bigint           not null, primary key
#  taker_id   :bigint
#  quiz_id    :bigint
#  score      :integer          default(0)
#  time       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class QuizTake < ApplicationRecord
    belongs_to :taker, class_name: :User, foreign_key: :taker_id
    belongs_to :quiz
end
