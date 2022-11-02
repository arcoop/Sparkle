# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_11_02_004935) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.text "body"
    t.bigint "quiz_id"
    t.bigint "commenter_id"
    t.integer "points", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commenter_id"], name: "index_comments_on_commenter_id"
    t.index ["quiz_id"], name: "index_comments_on_quiz_id"
  end

  create_table "likes", force: :cascade do |t|
    t.bigint "liker_id"
    t.bigint "comment_id"
    t.boolean "like_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comment_id"], name: "index_likes_on_comment_id"
    t.index ["liker_id"], name: "index_likes_on_liker_id"
  end

  create_table "questions", force: :cascade do |t|
    t.text "body", null: false
    t.text "answer", null: false
    t.bigint "quiz_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quiz_id"], name: "index_questions_on_quiz_id"
  end

  create_table "quiz_takes", force: :cascade do |t|
    t.bigint "taker_id"
    t.bigint "quiz_id"
    t.integer "score", default: 0
    t.integer "time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quiz_id"], name: "index_quiz_takes_on_quiz_id"
    t.index ["taker_id"], name: "index_quiz_takes_on_taker_id"
  end

  create_table "quizzes", force: :cascade do |t|
    t.string "title", null: false
    t.string "quiz_type", null: false
    t.text "description"
    t.integer "quiz_timer"
    t.string "permalink"
    t.string "answer_type"
    t.string "hint_heading"
    t.string "answer_heading"
    t.string "extra_heading"
    t.bigint "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "max_score", default: 1
    t.bigint "category_id"
    t.string "time"
    t.index ["author_id"], name: "index_quizzes_on_author_id"
    t.index ["category_id"], name: "index_quizzes_on_category_id"
    t.index ["title"], name: "index_quizzes_on_title", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "comments", "quizzes"
  add_foreign_key "comments", "users", column: "commenter_id"
  add_foreign_key "likes", "users", column: "comment_id"
  add_foreign_key "likes", "users", column: "liker_id"
  add_foreign_key "questions", "quizzes"
  add_foreign_key "quiz_takes", "quizzes"
  add_foreign_key "quiz_takes", "users", column: "taker_id"
  add_foreign_key "quizzes", "categories"
  add_foreign_key "quizzes", "users", column: "author_id"
end
