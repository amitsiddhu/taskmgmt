class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request!

  def authenticate
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = jwt_encode(user_id: user.id)
      render json: { token: token }, status: :ok
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  private

  def jwt_encode(payload)
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end
end
