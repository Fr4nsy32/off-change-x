class Store < ApplicationRecord
  belongs_to :user
  has_many :transactions

  validates :name, presence: true
  validates :address, presence: true
end
