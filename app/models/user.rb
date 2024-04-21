class User < ApplicationRecord
  has_secure_password
  has_one_attached :avatar
  has_many :tasks, dependent: :destroy
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }
end
