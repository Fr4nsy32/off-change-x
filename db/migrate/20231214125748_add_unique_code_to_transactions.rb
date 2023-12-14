class AddUniqueCodeToTransactions < ActiveRecord::Migration[7.1]
  def change
    add_column :transactions, :unique_code, :string
  end
end
