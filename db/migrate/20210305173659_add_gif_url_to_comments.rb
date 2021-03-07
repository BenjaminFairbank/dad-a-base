class AddGifUrlToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :gif_url, :string
  end
end
