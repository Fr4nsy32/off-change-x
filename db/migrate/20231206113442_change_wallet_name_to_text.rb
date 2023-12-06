class ChangeWalletNameToText < ActiveRecord::Migration[7.1]
  def change
    change_column :wallets, :name, :text
  end
end
