class Wallet < ApplicationRecord
  belongs_to :user
  validates :name, :currency, :main, presence: true
end
