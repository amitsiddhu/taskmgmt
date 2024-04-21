require "test_helper"

class AuthenticationControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @token = generate_jwt(@user)
  end

  # User login
  test "should authenticate user" do
    post authenticate_url, params: { user: { email: @user.email, password: 'password' } }
    assert_response :ok
  end
  
  # No actual change in server-side state occurs, so this is more about convention.
  test "should respond to logout" do
    delete logout_url, headers: { Authorization: "Bearer #{@token}" }
    assert_response :ok
  end

end
