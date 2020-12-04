class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :jokes

  has_many :jokes
end
