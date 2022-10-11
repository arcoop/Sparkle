# == Schema Information
#
# Table name: quizzes
#
#  id             :bigint           not null, primary key
#  title          :string           not null
#  quiz_type      :string           not null
#  description    :text             not null
#  quiz_timer     :integer          not null
#  permalink      :string
#  answer_type    :string           not null
#  hint_heading   :string
#  answer_heading :string
#  extra_heading  :string
#  category       :string           not null
#  quiz_author_id :bigint
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Quiz < ApplicationRecord
    validates_presence_of :title, :quiz_type, :description, :quiz_timer, :category

    belongs_to :quiz_author, class_name: :User, foreign_key: :quiz_author_id

    
end
