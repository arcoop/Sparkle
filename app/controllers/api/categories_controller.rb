class Api::CategoriesController < ApplicationController
    def index
        @categories = Category.all
        render 'api/categories/index'
    end

    def show
        @category = Category.find_by(name: params[:name])
        render 'api/category/show'
    end
end
