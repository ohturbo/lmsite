class CommentsController < ApplicationController
	before_action :find_post, only: [:show]
	def index
		@comments = Comment.all.order("created_at DESC")
	end

	def show
		
	end

	def new
		@comment = Comment.new
	end

	def create
		@comment = Comment.new(comment_params)

		if @comment.save
			redirect_to @comment
		else
			render 'new'
		end
	end

	private

	def find_post
		@comment = Comment.find(params[:id])
	end

	def comment_params
		params.require(:comment).permit(:content)
	end
end
