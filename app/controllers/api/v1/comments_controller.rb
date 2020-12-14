class Api::V1::CommentsController < ApplicationController

  def create
    comment = Comment.new(comment_params)
    comment.user = current_user
    if comment.save
      render json: comment
    else
      render json: {error: comment.errors.full_messages.to_sentence}
    end
  end

  protected

  def comment_params
    params.require(:comment).permit(:joke_id, :body)
  end
end