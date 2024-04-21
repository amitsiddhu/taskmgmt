include Pundit::Authorization

class ApplicationController < ActionController::API
  before_action :authenticate_request!

  private

  def authenticate_request!
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    decoded = jwt_decode(header)
    @current_user = User.find(decoded[:user_id])
  rescue JWT::DecodeError => e
    render json: { errors: e.message }, status: :unauthorized
  end

  def jwt_decode(token)
    decoded = JWT.decode(token, Rails.application.credentials.secret_key_base, false).first
    HashWithIndifferentAccess.new decoded
  end

  def current_user
    @current_user
  end
end
