class Store < ApplicationRecord
  belongs_to :store_owner, class_name: 'User'
  has_one :store_wallet
  has_many :transactions

  enum role: [:regular_user, :store_owner]

  validates :name, presence: true
  validates :location, presence: true
end
