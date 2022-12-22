class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password', 'icon']

  def index
    @users = User.all
    render 'api/users/index'
  end

  def show
    @user = User.find(params[:id])
    render 'api/users/show'
  end

  def search
    query = "%#{params[:s]}%"
    @users = User.where("lower(username) LIKE ?", query.downcase)
    render 'api/users/search'
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update_icon
    @user = User.find(params[:id])
    p @user
    @user.icon.purge
    p 'purged'
    if @user.update(user_params)
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :username, :password, :icon, :s, :id, :created_at, :updated_at)
  end
end
