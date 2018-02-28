class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :f_name
      t.string :l_name
      t.datetime :dob
      t.string :phone

      t.timestamps null: false
    end
  end
end
