class TaskPolicy < ApplicationPolicy 
  def create?
    user.id == record.user_id
  end
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
