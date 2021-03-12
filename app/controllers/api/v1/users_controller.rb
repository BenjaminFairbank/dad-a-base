class Api::V1::UsersController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:create, :update]

  rescue_from ActiveRecord::RecordNotFound, :with => :no_record_handler

  def show
    user = User.find(params[:id])
    render json: {
      user: serialized_data(user, UserSerializer),
      jokes: serialized_data(user.jokes, JokeSerializer)
    }
  end

  def create
    user = User.new(user_params)
    if user.save
      sign_in(:user, user)
      render json: user
    else
      render json: {error: user.errors.full_messages.to_sentence}
    end
  end

  def update
    user = User.find(params[:id])
    if user == current_user
      if user.update(user_params)
        render json: user
      else
        render json: {error: user.errors.full_messages.to_sentence}
      end
    else
      render json: {error: "You are UNAUTHORIZED to edit this user!"}
    end
  end

  def destroy
    user = User.find(params[:id])
    if user == current_user
      sign_out
      user.destroy
      render json: current_user
    else
      render json: {error: "You are UNAUTHORIZED to delete this user!"}
    end
  end

  def change_password
    target_user = User.find(params[:id])
    if target_user == current_user
      user = User.find_for_authentication email: user_params[:email]
      if user
        if user.valid_password? user_params[:current_password]
          user.password = user_params[:password]
          user.password_confirmation = user_params[:password_confirmation]
          if user.save
            render json: {success: "Your new password has been changed successfully!"}
          else
            render json: {error: user.errors.full_messages.to_sentence}
          end
        else
          render json: {error: "The current password is incorrect"}
        end
      end
    else
      render json: {error: "You are UNAUTHORIZED to delete this user!"}
    end
  end

  def check_for_user
    if current_user
      render json: current_user
    else
      render json: {error: "You are not currently signed in."}
    end
  end

  def sign_in_user
    user = User.find_for_authentication email: user_params[:email]
    if user
      if user.valid_password? user_params[:password]
        sign_in :user, user
        render json: user
      else
        render json: { error: 'Invalid password' }
      end
    else
      render json: { error: 'Email does not match any existing account.' }
    end
  end

  def sign_out_user
    sign_out
    render json: current_user
  end

  protected

  def user_params
    params.require(:user).permit(:email, :user_name, :current_password, :password, :password_confirmation, :profile_photo, :about_me)
  end

  def no_record_handler(exception)  
    render json: { error: "No user with ID #{exception.id} found." }
  end

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer)
  end
end