class Api::V1::CommentsController < ApplicationController

  def create
    comment = Comment.new(comment_params)
    if current_user
      comment.user = current_user
      if comment.save
        joke = comment.joke
        render json: joke.comments.by_created
      else
        render json: {error: comment.errors.full_messages.to_sentence}
      end
    else
      render json: {error: "Log-in or sign-up to post comments"}
    end
  end

  def update
    comment = Comment.find(params[:id])
    user = comment.user
    joke = comment.joke
    if user.id == current_user.id
      if comment.update(comment_params)
        render json: joke.comments.by_created
      else
        render json: {error: comment.errors.full_messages.to_sentence}
      end
    else
      render json: {error: 'You are not authorized to edit this comment!'}
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    user = comment.user
    joke = comment.joke
    if user.id == current_user.id
      comment.destroy
      render json: joke.comments.by_created
    else
      render json: {error: 'You are not authorized to delete this comment!'}
    end
  end

  protected

  def comment_params
    params.require(:comment).permit(:joke_id, :body, :gif_url)
  end
end