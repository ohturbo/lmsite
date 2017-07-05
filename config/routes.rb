Rails.application.routes.draw do
	root 'posts#index'

	resources :comments
end
