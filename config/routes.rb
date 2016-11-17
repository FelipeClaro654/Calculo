Rails.application.routes.draw do
  resources :processos do
      get "retorna_indice", on: :collection
      get "retorna_indice_front", on: :collection
  end
  resources :autors do
    get "show_autor_table", on: :collection
    post "salva_pagamentos", on: :collection
  end
  root 'processos#new'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
