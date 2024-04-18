require 'test_helper'

class TaskMailerTest < ActionMailer::TestCase
  test "task_reminder" do
    task = tasks(:one)

    email = TaskMailer.task_reminder(task).deliver_now

    assert_not ActionMailer::Base.deliveries.empty?
    assert_equal [task.user.email], email.to
    assert_equal 'Task Reminder', email.subject
  end

  test "should send reminder for tasks due tomorrow" do
    task_due_tomorrow = Date.tomorrow

    # Expect TaskMailer#task_reminder to be called with the task_due_tomorrow and return a mock mail object.
    mock_mail = Minitest::Mock.new
    mock_mail.expect(:deliver_later, true)

    TaskMailer.stub :task_reminder, mock_mail, [task_due_tomorrow] do
      Rake::Task['reminder:send_reminders'].invoke
    end

    assert_mock mock_mail
  end
end
