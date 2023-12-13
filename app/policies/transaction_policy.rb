class TransactionPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end

  def create?
    true
  end

  def update?
    Wallet.find(record.receiver_id).user == user
  end

  def destroy?
    user.id == record.sender_id && record.status == "pending"
  end

  def proxy?
    true
  end
end
