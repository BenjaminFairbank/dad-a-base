class ChangeBodyInComments < ActiveRecord::Migration[5.2]
  def change
    change_column_null :comments, :body, true
  end
end
