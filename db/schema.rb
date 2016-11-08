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

ActiveRecord::Schema.define(version: 20161104132519) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "autors", force: :cascade do |t|
    t.string   "nome"
    t.integer  "processo_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
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

  create_table "data_calculos", force: :cascade do |t|
    t.string   "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "processos", force: :cascade do |t|
    t.string   "numero"
    t.date     "data_distribuicao"
    t.string   "processo_autor"
    t.string   "forum"
    t.date     "data_citacao"
    t.string   "vara"
    t.string   "tipo_processo"
    t.string   "data_base"
    t.string   "sentenca"
    t.string   "re"
    t.string   "acordao"
    t.string   "base_calculo_autor"
    t.integer  "tabela_atualizacao_id"
    t.integer  "cbpm_ipesp_id"
    t.decimal  "cbpm_ipesp_valor"
    t.date     "periodo_inicial"
    t.date     "periodo_final"
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

  create_table "tipo_juros", force: :cascade do |t|
    t.string   "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
