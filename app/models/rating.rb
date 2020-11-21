class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :joke

  validates :value, presence: true, numericality: { only_integer: true }
end
