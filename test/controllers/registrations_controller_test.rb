require 'test_helper'

class RegistrationsControllerTest < ActionDispatch::IntegrationTest
  test "should register user" do
    assert_difference('User.count') do
      post signup_url, params: { user: { email: 'test@example.com', password: 'password123', password_confirmation: 'password123' } }, as: :json
    end

    assert_response :created
  end

  test "should not register user with invalid data" do
    post signup_url, params: { user: { email: 'test', password: 'pass', password_confirmation: 'word' } }, as: :json
    assert_response :unprocessable_entity
  end
end
