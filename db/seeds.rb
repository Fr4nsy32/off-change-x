# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
users_data = [
  {
    email: "example1@example.com",
    password: "password",
    username: "user1",
    first_name: "John",
    last_name: "Doe",
    birth_date: "1990-01-01",
    country: "USA",
    category: "user"
  },
  {
    email: "store1@example.com",
    password: "password",
    username: "store1",
    first_name: "Jane",
    last_name: "Smith",
    birth_date: "1992-02-02",
    country: "Canada",
    category: "store"
  },
  {
    email: "store2@example.com",
    password: "password",
    username: "store2",
    first_name: "Jane",
    last_name: "Smith",
    birth_date: "1992-02-02",
    country: "Canada",
    category: "store"
  },

  # Add more user data as needed
]

# Create users
users_data.each do |user_data|
  User.create!(user_data)
end

stores_data = [
  {
    name: "Store One",
    address: "123 Main St, Townsville",
    opening_time: "08:00",
    closing_time: "22:00",
    max_cash: 5000.0,
    unique_code: "S1",
    user_id: 3,
    latitude: 40.7128,
    longitude: -74.0060
  },
  {
    name: "Store Two",
    address: "456 Elm St, Cityville",
    opening_time: "09:00",
    closing_time: "23:00",
    max_cash: 15000.0,
    unique_code: "S2",
    user_id: 2,
    latitude: 34.0522,
    longitude: -118.2437
  }
  # Add more store data as needed
]

# Create stores
stores_data.each do |store_data|
  Store.create!(store_data)
end

wallets_data = [

  # Wallets for User 1

  { name: "User1 Wallet 1", currency: "USD", balance: 1000.0, user_id: 1, main: true },
  { name: "User1 Wallet 2", currency: "EUR", balance: 800.0, user_id: 1, main: false },
  { name: "User1 Wallet 3", currency: "GBP", balance: 600.0, user_id: 1, main: false },

  # Wallets for User 2
  { name: "User2 Wallet 1", currency: "EUR", balance: 1200.0, user_id: 2, main: true },
  { name: "User2 Wallet 2", currency: "USD", balance: 900.0, user_id: 2, main: false },
  { name: "User2 Wallet 3", currency: "CAD", balance: 700.0, user_id: 2, main: false },

  # Wallets for User 3
  { name: "User3 Wallet 1", currency: "GBP", balance: 1100.0, user_id: 3, main: true },
  { name: "User3 Wallet 2", currency: "USD", balance: 1000.0, user_id: 3, main: false },
  { name: "User3 Wallet 3", currency: "EUR", balance: 500.0, user_id: 3, main: false }
]

# Create wallets
wallets_data.each do |wallet_data|
  Wallet.create!(wallet_data)
end

# db/seeds.rb

# Sample data for transactions
transactions_data = [
  # Transaction 1
  { amount: 50.0, sender_id: 1, receiver_id: 2 },
  # Transaction 2
  { amount: 75.0, sender_id: 3, receiver_id: 7 },
  # Transaction 3
  { amount: 100.0, sender_id: 1, receiver_id: 9 }
  # Additional transactions can be added here
]

# Create transactions
transactions_data.each do |transaction_data|
  Transaction.create!(transaction_data)
end
