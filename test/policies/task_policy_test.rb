require 'test_helper'

class TaskPolicyTest < ActiveSupport::TestCase
  setup do
    @user = users(:one)
    @other_user = users(:two)
    @task = Task.create(title: 'Test Task', user: @user)
  end

  test 'user should access their own task' do
    assert Pundit.policy(@user, @task).show?
  end

  test 'user should not access other user\'s task' do
    refute Pundit.policy(@other_user, @task).show?
  end

  # Add more tests as needed for other actions (create, update, destroy)
end
