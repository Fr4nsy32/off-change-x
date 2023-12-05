class Store < ApplicationRecord
  has_one :store_wallet
  has_many :transactions

  validates :name, presence: true
  validates :location, presence: true
end
