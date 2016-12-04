Rails.application.routes.draw do
    resources :processos do
        get "retorna_indice", on: :collection
        get "retorna_indice_front", on: :collection
        get "atualiza_juros", on: :collection
        get "render_resumo", on: :collection
    end
    resources :autors do
        get "show_autor_table", on: :collection
        post "salva_pagamentos", on: :collection
        post "salva_totais", on: :collection
        post "destroy", on: :collection
    end
    resources :custas do
        post "destroy", on: :collection
    end
    resources :tabela_opv do
        get "edit_table", on: :collection
        post "update_valor", on: :collection
        post "add_ano", on: :collection
    end
    resources :tabela_judicial do
        get "edit_table", on: :collection
        post "update_valor", on: :collection
        post "add_ano", on: :collection
    end
    resources :tabela_fazenda do
        get "edit_table", on: :collection
        post "update_valor", on: :collection
        post "add_ano", on: :collection
    end
    resources :tabela_juro do
        get "edit_table", on: :collection
        post "update_valor", on: :collection
        post "add_ano", on: :collection
    end
    root "processos#new"
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
