class Book < ActiveRecord::Base
  
  validates :title, presence: true,
            uniqueness: { case_sensitive: false }
  validates :author, presence: true
  validates :genre, presence: true
  validates :isbn, presence: true
  validates :publish_date, presence: true
  validates :publisher, presence: true
  validates :description, presence: true,
            length: { minimum: 20, maximum: 500 }
end
