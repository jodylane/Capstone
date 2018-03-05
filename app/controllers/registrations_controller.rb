class RegistrationsController < Devise::RegistrationsController
  
  private
  # this method overrides Devise RegistrationsController method to accept our new params that we have added to signup
  def sign_up_params
    params.require(:user).permit(:f_name, :l_name, :email, :dob, :phone, :password, :password_confirmation)
  end
  
  def account_update_params
    params.require(:user).permit(:f_name, :l_name, :email, :dob, :phone, :password, :password_confirmation, :current_password)
  end
end