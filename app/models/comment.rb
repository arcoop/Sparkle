# == Schema Information
#
# Table name: comments
#
#  id           :bigint           not null, primary key
#  body         :text
#  quiz_id      :bigint
#  commenter_id :bigint
#  points       :integer          default(1)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Comment < ApplicationRecord
    validates :body, length: {in: 1..2048}

    belongs_to :quiz
    belongs_to :commenter, class_name: :User, foreign_key: :commenter_id
end
