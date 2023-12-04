class CreateStores < ActiveRecord::Migration[7.1]
  def change
    create_table :stores do |t|

      t.string :name
      t.string :address
      t.time :opening_time
      t.time :closing_time
      t.float :max_cash
      t.string :unique_code

      t.timestamps
    end
  end
end
