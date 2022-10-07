class User < ApplicationRecord
  has_secure_password
  before_validation :ensure_session_token

  validates :username, length: {in: 3..30}, format: {without: URI::MailTo::EMAIL_REGEXP, message: "username can't be email" }
  validates :email, length: {in: 3..255}, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: {in: 6..255}, allow_nil: true

  def self.find_by_credentials(credential, pwd)
    user = User.find_by(URI::MailTo::EMAIL_REGEXP.match(credential) ? {email: credential} : {username: credential})
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
