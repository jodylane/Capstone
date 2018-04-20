class Cart
  def initialize(session)
    @session = session
  end
  
  def add_to_cart(id)
    @session[:cart] = @session[:cart].push(id)
  end
  
  def get_cart
    @session[:cart] ||= []
  end
end