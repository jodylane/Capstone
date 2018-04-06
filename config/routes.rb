Rails.application.routes.draw do
  devise_for :users, controllers: {registrations: 'registrations' }
  
  root 'books#home'
  resources :books
  
  resources :users
end
