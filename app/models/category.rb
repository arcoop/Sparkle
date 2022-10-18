# == Schema Information
#
# Table name: categories
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Category < ApplicationRecord
    validates_presence_of :name, inclusion: {in: ['Entertainment', 'Gaming', 'Geography', 'History', 'Holiday', 'Just For Fun', 'Language', 'Literature', 'Miscellaneous', 'Movies', 'Music', 'Religious', 'Science', 'Sports', 'Television']}

    has_many :quizzes, dependent: :destroy
end
