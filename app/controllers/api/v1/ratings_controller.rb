class Api::V1::RatingsController < ApplicationController

  def create
    rating = Rating.new(rating_params)
    if current_user
      rating.user = current_user
      if rating.save
        render json: rating
      else
        render json: {error: rating.errors.full_messages.to_sentence}
      end
    else
      render json: {error: "Log-in or sign-up to post ratings"}
    end
  end

  def update
    rating = Rating.find(params[:id])
    user = rating.user
    if user.id == current_user.id
      if rating.update(rating_params)
        render json: rating
      else 
        render json: {error: rating.errors.full_messages.to_sentence}
      end
    else
      render json: {error: 'You are not authorized to edit this rating!'}
    end
  end

  protected

  def rating_params
    params.require(:rating).permit(:joke_id, :value)
  end

end