class PostsController < ApplicationController
	before_action :find_post, only: [:show]
	def index
		@post = Post.new()
	end

	def new 
		@post = Post.new()
	end

	def show
	end

	def create
		@post = Post.new(post_params)

		if @post.save
			redirect_to comments_path
		else
			render 'new'
		end
	end


	private 

	def find_post
		@post = Post.find(params[:id])
	end

	def post_params
		params.require(:post).permit(:skin, 
									:head,  
									:hair, 
									:hairbacking,
									:eye, 
									:eyebrow, 
									:nose, 
									:mouth, 
									:facehair, 
									:spectacles)
	end
end
