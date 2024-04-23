include Rails.application.routes.url_helpers

class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :avatar

  def avatar
    rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
  end
end
