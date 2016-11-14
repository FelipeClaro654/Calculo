Rails.application.routes.draw do
  resources :processos
  resources :autors do
    get "show_autor_table", on: :collection
    post "salva_pagamentos", on: :collection
  end
  root 'processos#new'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
