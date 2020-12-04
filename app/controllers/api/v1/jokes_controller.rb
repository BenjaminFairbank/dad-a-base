class Api::V1::JokesController < ApplicationController

  def index
    render json: {
      jokes: serialized_data(Joke.all, JokeSerializer),
      currentUser: serialized_data(current_user, UserSerializer)
    }
  end

  protected

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer)
  end

end