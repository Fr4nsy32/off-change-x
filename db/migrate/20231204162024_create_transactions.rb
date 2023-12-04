class CreateTransactions < ActiveRecord::Migration[7.1]
  def change
    create_table :transactions do |t|

      t.float :amount
      t.references :sender, foreign_key: { to_table: :wallets }
      t.references :receiver, foreign_key: { to_table: :wallets }

      t.timestamps
    end
  end
end
