class Api::CategoriesController < ApplicationController
    def index
        @categories = Category.all
        render 'api/categories/index'
    end

    def show
        name = params[:name].capitalize()
        @category = Category.find_by(name: name)
        render 'api/category/show'
    end
end
