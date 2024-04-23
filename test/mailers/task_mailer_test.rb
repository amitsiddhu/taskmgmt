require 'test_helper'

class TaskMailerTest < ActionMailer::TestCase
  test "task_reminder" do
    task = tasks(:one)

    email = TaskMailer.task_reminder(task).deliver_now

    assert_not ActionMailer::Base.deliveries.empty?
    assert_equal [task.user.email], email.to
    assert_equal 'Task Reminder', email.subject
  end
end
