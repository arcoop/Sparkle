# == Schema Information
#
# Table name: quizzes
#
#  id             :bigint           not null, primary key
#  title          :string           not null
#  quiz_type      :string           not null
#  description    :text
#  quiz_timer     :integer
#  permalink      :string
#  answer_type    :string
#  hint_heading   :string
#  answer_heading :string
#  extra_heading  :string
#  author_id      :bigint           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  max_score      :integer          default(1)
#  category_id    :bigint
#  time           :string

class Quiz < ApplicationRecord
    validates_presence_of :title, :quiz_type, :author_id

    belongs_to :author, class_name: :User, foreign_key: :author_id
    belongs_to :category
    has_many :questions, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :takes, class_name: :QuizTake, foreign_key: :quiz_id, dependent: :destroy
    has_many :takers, through: :takes, source: :taker, dependent: :destroy

    has_one_attached :icon

    def self.find_category_by_name(name)
        category = Category.find_by(name: name)
    end
    
end
