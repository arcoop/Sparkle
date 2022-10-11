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
