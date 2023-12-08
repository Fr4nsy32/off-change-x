class AddRateToTransactions < ActiveRecord::Migration[7.1]
  def change
    add_column :transactions, :rate, :float
  end
end
