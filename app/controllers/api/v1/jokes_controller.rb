class Api::V1::JokesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    render json: Joke.all
  end

  def create
    joke = Joke.new(joke_params)
    if current_user
      joke.user = current_user
      if joke.save
        render json: joke
      else
        render json: {error: joke.errors.full_messages.to_sentence}
      end
    else
      render json: {error: "Log-in or sign-up to post dad jokes"}
    end
  end

  def destroy
    joke = Joke.find(params[:id])
    user = joke.user
    id = joke.id
    if user.id == current_user.id
      joke.destroy
      render json: Joke.all
    else
      render json: {error: 'You are not authorized to delete this Joke!'}
    end
  end

  protected

  def joke_params
    params.require(:joke).permit(:body, :image)
  end

end