class Api::V1::RatingsController < ApplicationController

  def create
    rating = Rating.new(rating_params)
    rating.user = current_user
    if rating.save
      render json: rating
    else
      render json: {error: rating.errors.full_messages.to_sentence}
    end
  end

  def update
    rating = Rating.find(params[:id])
    if rating.update(rating_params)
      render json: rating
    else 
      render json: {error: rating.errors.full_messages.to_sentence}
    end
  end

  protected

  def rating_params
    params.require(:rating).permit(:joke_id, :value)
  end

end