class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :joke

  validates :body, presence: true
end
