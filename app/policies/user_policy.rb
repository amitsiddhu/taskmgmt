class UserPolicy < ApplicationPolicy
  def index
    user.id.present?
  end

  def show?
    user.id.present?
  end

  def update?
    user.id == record.id
  end

  def destroy?
    update?
  end
end
