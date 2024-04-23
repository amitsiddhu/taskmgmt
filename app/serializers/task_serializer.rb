class TaskSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :description, :due_date, :status, :created_at, :updated_at
end
