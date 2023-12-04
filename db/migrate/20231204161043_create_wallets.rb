class CreateWallets < ActiveRecord::Migration[7.1]
  def change
    create_table :wallets do |t|

      t.string :name
      t.string :currency
      t.float :balance, default: 0
      t.references :user, null: false, foreign_key: true
      t.boolean :main, default: false

      t.timestamps
    end
  end
end
