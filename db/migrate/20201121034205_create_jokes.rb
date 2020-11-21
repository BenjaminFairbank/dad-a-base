class CreateJokes < ActiveRecord::Migration[5.2]
  def change
    create_table :jokes do |t|
      t.belongs_to :user, null: false

      t.string :body
      t.string :image

      t.timestamps       null: false
    end
  end
end
