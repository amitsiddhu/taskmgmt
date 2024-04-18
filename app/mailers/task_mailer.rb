class TaskMailer < ApplicationMailer
  def task_reminder(task)
    @task = task
    mail(to: @task.user.email, subject: 'Task Reminder')
  end
end
