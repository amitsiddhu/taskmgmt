class Task < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  validates :status, presence: true, inclusion: { in: %w(All To\ Do In\ Progress Done) }
end
