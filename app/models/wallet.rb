class Wallet < ApplicationRecord
  belongs_to :user
  validates :name, :currency, presence: true
end
