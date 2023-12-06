class Transaction < ApplicationRecord
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :sender_id, presence: true
  validates :receiver_id, presence: true
  belongs_to :sender, class_name: 'Wallet', foreign_key: 'sender_id'
  belongs_to :receiver, class_name: 'Wallet', foreign_key: 'receiver_id'
  enum status: { pending: 0, accepted: 1, rejected: 2 }
end
