class TaskPolicy < ApplicationPolicy
  
  def show?
    user.id == record.user_id
  end

  def update?
    user.id == record.user_id
  end

  def destroy?
    update?
  end
end
