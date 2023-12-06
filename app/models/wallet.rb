class Wallet < ApplicationRecord
  belongs_to :user
  validates :name, :currency, presence: true
  # has_many :transactions, dependent: :destroy
  has_many :transactions_as_sender, class_name: "Transaction", foreign_key: :sender_id
  has_many :transactions_as_receiver, class_name: "Transaction", foreign_key: :receiver_id
  # validates :name, :currency, :main, presence: true

end
