# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161204114630) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "autors", force: :cascade do |t|
    t.string   "nome"
    t.date     "periodo_inicial"
    t.date     "periodo_final"
    t.decimal  "liquido"
    t.decimal  "bruto"
    t.decimal  "juros"
    t.decimal  "honorario"
    t.decimal  "custas"
    t.decimal  "total_individual"
    t.decimal  "previdencia_assistencia"
    t.decimal  "previdencia"
    t.decimal  "assistencia"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "processo_id"
  end

  create_table "cbpm_ipesps", force: :cascade do |t|
    t.string   "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cruz_iamspes", force: :cascade do |t|
    t.string   "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "custa", force: :cascade do |t|
    t.integer  "processo_id"
    t.date     "custas_data"
    t.decimal  "custas_valor"
    t.decimal  "custas_corrigida"
    t.decimal  "indice"
    t.string   "folhas"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["processo_id"], name: "index_custa_on_processo_id", using: :btree
  end

  create_table "data_calculos", force: :cascade do |t|
    t.string   "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pagamentos", force: :cascade do |t|
    t.integer  "autor_id"
    t.integer  "table_index"
    t.string   "periodo_inicial"
    t.string   "periodo_final"
    t.decimal  "periodo_value"
    t.decimal  "indice_tabela"
    t.decimal  "indice_atualizacao"
    t.decimal  "bruto_atualizacao"
    t.decimal  "previdencia_assistencia"
    t.decimal  "previdencia"
    t.decimal  "assistencia"
    t.decimal  "liquido_atualizado"
    t.decimal  "meses"
    t.decimal  "juros"
    t.decimal  "honorario"
    t.date     "periodo"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.index ["autor_id"], name: "index_pagamentos_on_autor_id", using: :btree
  end

  create_table "processos", force: :cascade do |t|
    t.string   "numero"
    t.date     "data_distribuicao"
    t.string   "processo_autor"
    t.string   "forum"
    t.date     "data_citacao"
    t.string   "vara"
    t.string   "tipo_processo"
    t.date     "data_base"
    t.decimal  "indice_tabela"
    t.decimal  "custas_total"
    t.decimal  "liquido_total"
    t.decimal  "juros_total"
    t.decimal  "assistencia_total"
    t.decimal  "subtotal"
    t.decimal  "honorarios_base"
    t.decimal  "total_apurado"
    t.string   "sentenca"
    t.string   "re"
    t.string   "acordao"
    t.string   "base_calculo_autor"
    t.integer  "tabela_atualizacao_id"
    t.integer  "cbpm_ipesp_id"
    t.decimal  "cbpm_ipesp_valor"
    t.decimal  "juros"
    t.integer  "tipo_juro_id"
    t.integer  "cruz_iamspe_id"
    t.decimal  "cruz_iamspe_valor"
    t.integer  "data_calculo_id"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  create_table "tabela_atualizacaos", force: :cascade do |t|
    t.string   "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tabela_fazendas", force: :cascade do |t|
    t.string   "mes"
    t.string   "ano"
    t.decimal  "valor"
    t.string   "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tabela_judicials", force: :cascade do |t|
    t.string   "mes"
    t.string   "ano"
    t.decimal  "valor"
    t.string   "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tabela_juros", force: :cascade do |t|
    t.string   "mes"
    t.string   "ano"
    t.decimal  "valor"
    t.string   "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tabela_opvs", force: :cascade do |t|
    t.string   "mes"
    t.string   "ano"
    t.decimal  "valor"
    t.string   "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tipo_juros", force: :cascade do |t|
    t.string   "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "custa", "processos"
  add_foreign_key "pagamentos", "autors"
end
