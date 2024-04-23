class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request!

  def authenticate
    user = User.find_by(email: user_params[:email])
    if user&.authenticate(user_params[:password])
      token = jwt_encode(user_id: user.id)
      render json: { token: token }, status: :ok
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def logout
    # Simulate logout by instructing the client to delete the token
    render json: { message: 'Logged out successfully' }, status: :ok
  end

  private

  def jwt_encode(payload)
    JWT.encode(payload, Rails.application.credentials[:secret_key_base])
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
