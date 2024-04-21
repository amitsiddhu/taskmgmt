class UserPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def show?
    user.id == record.id
  end

  def update?
    user.id == record.id
  end

  def destroy?
    update?
  end
end
