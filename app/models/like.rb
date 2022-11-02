# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  liker_id   :bigint
#  comment_id :bigint
#  like_type  :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord
    belongs_to :liker, class_name: :User, foreign_key: :liker_id
    belongs_to :comment
end
