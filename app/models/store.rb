class Store < ApplicationRecord
  belongs_to :user
  has_one :wallet
  has_many :transactions

  validates :name, presence: true
  validates :location, presence: true

  def store_owner?
    user.present?
  end
end
