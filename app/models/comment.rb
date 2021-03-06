class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :joke

  scope :by_created, -> { order(created_at: :asc) }
end
