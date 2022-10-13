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
#  category       :string
#  author_id      :bigint           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Quiz < ApplicationRecord
    validates_presence_of :title, :quiz_type, :author_id

    belongs_to :author, class_name: :User, foreign_key: :author_id

    
end