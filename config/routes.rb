Rails.application.routes.draw do
  root 'loot#index'
  resources :loot
end
