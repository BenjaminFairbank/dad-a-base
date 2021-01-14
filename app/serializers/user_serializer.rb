class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :user_name, :jokes, :comments, :ratings, :profile_photo, :about_me

  has_many :jokes
  has_many :comments
  has_many :ratings
end
