class Api::V1::JokesController < ApplicationController

  def index
    render json: {
      jokes: serialized_data(Joke.all, JokeSerializer),
      currentUser: serialized_data(current_user, UserSerializer)
    }
  end

  def create
    joke = Joke.new(joke_params)
    joke.user = current_user

    if joke.save
      render json: joke
    else
      render json: {error: joke.errors.full_messages.to_sentence}
    end
  end

  protected

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer)
  end

  def joke_params
    params.require(:joke).permit(:body, :image)
  end

end