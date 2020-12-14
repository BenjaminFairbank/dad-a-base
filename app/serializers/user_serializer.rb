class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :jokes, :comments, :ratings

  has_many :jokes
  has_many :comments
  has_many :ratings
end
