class CommentSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :body, :user, :joke
end