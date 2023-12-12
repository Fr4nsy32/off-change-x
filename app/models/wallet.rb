class Wallet < ApplicationRecord
  belongs_to :user

  validates :name, :currency, presence: true
  validates :currency, uniqueness: { case_sensitive: false, message: "already exists. Please choose a different currency." }, on: :create

  has_many :transactions_as_sender, class_name: "Transaction", foreign_key: :sender_id
  has_many :transactions_as_receiver, class_name: "Transaction", foreign_key: :receiver_id
end
