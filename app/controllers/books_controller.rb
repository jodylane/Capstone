class BooksController < ApplicationController
  before_action :set_book, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index, :show, :home]
  before_action :require_admin, except: [:index, :show, :home]
  
  def index
    @books = Book.all_except(get_cart)
  end
  
  def home
    redirect_to books_path if user_signed_in?
  end
  
  def show
    
  end
  
  def cart
    Cart.new(session).add_to_cart(params[:id])
    redirect_to show_cart_book_path
  end
  
  def showcart
    @books = Book.where(id: get_cart)
  end
  
  def checkout 
    Book.where(id: get_cart).update_all(status: false)
    session[:cart] = [];
    redirect_to books_path
  end

  def new
    @book = Book.new
  end
  
  def edit

  end

  def create
    @book = Book.new(book_params)

    respond_to do |format|
      if @book.save
        format.html { redirect_to @book, success: 'Book was successfully created.' }
        format.json { render :show, status: :created, location: @book }
      else
        format.html { render :new }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @book.update(book_params)
        format.html { redirect_to @book, success: 'Book was successfully updated.' }
        format.json { render :show, status: :ok, location: @book }
      else
        format.html { render :edit }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @book.destroy
    respond_to do |format|
      format.html { redirect_to books_url, success: 'Book was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_book
      @book = Book.find(params[:id])
    end
    
    def book_params
      params.require(:book).permit(:title, :author, :genre, :isbn, :publish_date, :publisher, :status, :description, :image)
    end
    
    def get_cart
      Cart.new(session).get_cart
    end
end
