namespace :reminder do
  desc "Send reminders for tasks due tomorrow"
  task send_reminders: :environment do
    tasks_due_tomorrow = Task.where(due_date: Date.tomorrow.all_day)

    tasks_due_tomorrow.find_each do |task|
      TaskMailer.task_reminder(task).deliver_later
    end
  end
end
