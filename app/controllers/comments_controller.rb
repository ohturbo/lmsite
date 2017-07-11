class CommentsController < ApplicationController
	before_action :find_post, only: [:show, :edit, :update, :destroy]
	before_action :authenticate_user!, except: [:index, :show]
	def index
		@comments = Comment.all.order("created_at DESC")
		@posts = Post.all.order("created_at DESC")
	end

	def show
		
	end

	def new
		@comment = current_user.comments.build
	end

	def create
		@comment = current_user.comments.build(comment_params)

		if @comment.save
			redirect_to comments_path
		else
			render comments_path
		end
	end

	def edit
	end

	def update
		if @comment.update
			redirect_to @comment
		else
			render 'edit'
		end
	end

	def destroy
		@comment.destroy
		redirect_to comments_path
	end

	private

	def find_post
		@comment = Comment.find(params[:id])
	end

	def comment_params
		params.require(:comment).permit(:content)
	end
end
