class Joke < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :ratings, dependent: :destroy
end
