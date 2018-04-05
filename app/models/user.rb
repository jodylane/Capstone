class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
    :registerable,
    :recoverable,
    :rememberable,
    :trackable,
    :validatable
    
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  
  
  validates :email, presence: true,
            uniqueness: { case_sensitive: false},
            format: { with: VALID_EMAIL_REGEX }
  validates :f_name, presence: true
  validates :l_name, presence: true
  validates :dob, presence: true
  
  def full_name
    "#{self.f_name} #{self.l_name}"
  end
end
