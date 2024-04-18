class Task < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  validates :status, presence: true, inclusion: { in: %w(All To\ Do In\ Progress Done) }
  validates :due_date, presence: true
  validate :due_date_must_be_in_the_future

  private

  def due_date_must_be_in_the_future
    errors.add(:due_date, "must be in the future") if due_date.present? && due_date < Time.current
  end
end
