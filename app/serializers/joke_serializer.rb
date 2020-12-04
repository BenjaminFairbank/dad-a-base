class JokeSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :body, :image, :user, :comments, :ratings

  has_many :comments
  has_many :ratings
end