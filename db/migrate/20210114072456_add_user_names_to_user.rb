class AddUserNamesToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :user_name, :string, unique: true, null: false
  end
end
