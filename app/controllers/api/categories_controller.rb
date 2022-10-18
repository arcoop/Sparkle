class Api::CategoriesController < ApplicationController
    def index
        @categories = Category.all
        render 'api/categories/index'
    end

    def show
        @category = Category.find(params[:id])
        render 'api/category/show'
    end
end
