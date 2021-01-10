class Api::V1::RatingsController < ApplicationController

  def create
    rating = Rating.new(rating_params)
    if current_user
      rating.user = current_user
      joke = rating.joke
      ratings = joke.ratings
      if rating.save
        render json: { 
          rating: serialized_data(rating, RatingSerializer),
          ratings: serialized_data(ratings, RatingSerializer)
        }
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
      joke = rating.joke
      ratings = joke.ratings
      if rating.update(rating_params)
        render json: { 
          rating: serialized_data(rating, RatingSerializer),
          ratings: serialized_data(ratings, RatingSerializer)
        }
      else 
        render json: {error: rating.errors.full_messages.to_sentence}
      end
    else
      render json: {error: 'You are not authorized to edit this rating!'}
    end
  end

  def destroy
    rating = Rating.find(params[:id])
    user = rating.user
    joke = rating.joke
    if user.id == current_user.id
      rating.destroy
      render json: joke.ratings
    else
      render json: {error: 'You are not authorized to delete this rating!'}
    end
  end

  protected

  def rating_params
    params.require(:rating).permit(:joke_id, :value)
  end

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer)
  end

end