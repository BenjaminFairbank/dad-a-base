class CommentSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :body, :gif_url, :user, :joke
end