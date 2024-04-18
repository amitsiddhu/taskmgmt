require "test_helper"

class TasksControllerTest < ActionDispatch::IntegrationTest

  setup do
    @task = tasks(:one)
    @token = generate_jwt(@task.user)
    @due_date = 3.days.from_now

  end

  test "should get index" do
    get tasks_url, as: :json, headers: { 'Authorization' => "Bearer #{@token}" }
    assert_response :success
  end

  test "should create task" do
    assert_difference("Task.count") do
      post tasks_url, params: { task: { description: @task.description, status: @task.status, title: @task.title, due_date: @due_date } }, as: :json, headers: { 'Authorization' => "Bearer #{@token}" }
    end

    assert_equal @due_date.to_i, Task.last.due_date.to_i
    assert_response :created
  end

  test "should show task" do
    get task_url(@task), as: :json, headers: { 'Authorization' => "Bearer #{@token}" }
    assert_response :success
  end

  test "should update task" do
    patch task_url(@task), params: { task: { description: @task.description, status: @task.status, title: @task.title, due_date: @due_date } }, as: :json, headers: { 'Authorization' => "Bearer #{@token}" }
    assert_response :success
  end

  test "should destroy task" do
    assert_difference("Task.count", -1) do
      delete task_url(@task), as: :json, headers: { 'Authorization' => "Bearer #{@token}" }
    end

    assert_response :no_content
  end
end
