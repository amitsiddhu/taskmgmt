require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test "should not save task without future due date" do
    task = Task.new(due_date: Time.current - 1.day)
    assert_not task.save, "Saved the task with a past due date"
  end
  test "search_by_title" do
    assert_equal 2, Task.search_by_title("Task").count
    # Assumes you have at least two tasks with "Task" in their titles in your fixtures or setup.
  end
  test "sorted_by_due_date ascending" do
    tasks = Task.sorted_by_due_date(:asc)
    assert_operator tasks.first.due_date, :<=, tasks.first.due_date
  end

  test "sorted_by_due_date descending" do
    tasks = Task.sorted_by_due_date(:desc)
    assert_operator tasks.first.due_date, :>=, tasks.second.due_date
  end
end
