class Store < ApplicationRecord
  belongs_to :user
  has_many :transactions
  validates :name, presence: true
  validates :address, presence: true
  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?
end
