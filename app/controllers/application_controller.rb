class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  helper_method :require_admin
  
  def require_admin
    if current_user != current_user.admin?
      flash[:danger] = "You must be an admin to perform this action."
      redirect_to root_path
    end
  end
  
end
