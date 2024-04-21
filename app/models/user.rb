class User < ApplicationRecord
  has_secure_password
  has_one_attached :avatar
  has_many :tasks, dependent: :destroy
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }
end
