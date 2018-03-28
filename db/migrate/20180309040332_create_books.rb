class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title, unique:true, null:false
      t.string :author
      t.string :genre
      t.string :isbn, unique:true
      t.date :publish_date
      t.string :publisher
      t.text :description
      t.string :image

      t.timestamps null: false
    end
  end
end
