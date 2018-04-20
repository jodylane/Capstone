Rails.application.routes.draw do
  devise_for :users, controllers: {registrations: 'registrations' }
  
  root 'books#home'
  resources :books
  get 'books/:id/cart', to: 'books#cart', as: 'cart_book'
  get 'book/showcart', to: 'books#showcart', as: 'show_cart_book'
  get 'book/checkout', to: 'books#checkout', as: 'checkout_book'
  
  resources :users
end
