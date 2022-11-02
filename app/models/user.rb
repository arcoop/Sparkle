# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password
  before_validation :ensure_session_token

  validates :username, length: {in: 3..30}, format: {without: URI::MailTo::EMAIL_REGEXP, message: "can't be email" }, uniqueness: true
  validates :email, length: {in: 3..255}, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: {message: "is not available"}
  validates :password, length: {in: 6..255}, allow_nil: true
  validates :session_token, uniqueness: true

  has_many :quizzes_authored, class_name: :Quiz, foreign_key: :author_id, dependent: :destroy
  has_many :comments_written, class_name: :Comment, foreign_key: :commenter_id, dependent: :destroy
  has_many :quiz_takes, class_name: :QuizTake, foreign_key: :taker_id
  has_many :quizzes_taken, through: :quiz_takes, source: :quiz
  has_many :likers, class_name: :Like, foreign_key: :liker_id, dependent: :destroy
  has_many :comments_liked, through: :likers, source: :comments

  has_one_attached :icon

  def self.find_by_credentials(credential, pwd)
    if URI::MailTo::EMAIL_REGEXP.match(credential)
      user = User.find_by(email: credential)
    else
      user = User.find_by(username: credential)
    end
    user&.authenticate(pwd) ? user : nil
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def generate_unique_session_token
    loop do
      token = SecureRandom::urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end

end
