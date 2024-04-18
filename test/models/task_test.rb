require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test "should not save task without future due date" do
    task = Task.new(due_date: Time.current - 1.day)
    assert_not task.save, "Saved the task with a past due date"
  end
end
