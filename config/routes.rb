Rails.application.routes.draw do
    devise_for :users
    
	root 'posts#index'

	resources :comments

	resources :posts
end
