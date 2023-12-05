class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :username, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :birth_date, presence: true
  # validates :country, presence: true
  validates :category, presence: true, inclusion: {in: %w(user store)}
  has_many :wallets, dependent: :destroy
  has_many :transactions, through: :wallets
end
