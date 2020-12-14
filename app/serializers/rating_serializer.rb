class RatingSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :value, :user, :joke
end