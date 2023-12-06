class AddStatusToTransactions < ActiveRecord::Migration[7.1]
  def change
    add_column :transactions, :status, :integer, default: 0
  end
end
