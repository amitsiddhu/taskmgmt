require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @token = generate_jwt(@user)
  end

  test "should get index" do
    get users_url, as: :json, headers: { 'Authorization' => "Bearer #{@token}" }
    assert_response :success
  end

  test "should show user" do
    get user_url(@user), as: :json, headers: { 'Authorization' => "Bearer #{@token}" }
    assert_response :success
  end

  test "should update user" do
    patch user_url(@user), params: { user: { name: 'Hello Jon' } }, as: :json, headers: { 'Authorization' => "Bearer #{@token}" }
    assert_response :success
  end

  test "should destroy user" do
    assert_difference("User.count", -1) do
      delete user_url(@user), as: :json, headers: { 'Authorization' => "Bearer #{@token}" }
    end

    assert_response :no_content
  end
end
