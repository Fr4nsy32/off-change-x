class PaymentsController < ApplicationController

  def new
  end

  def create
    customer = Stripe::Customer.create({
      :email => params[:stripeEmail],
      :source => params[:stripeToken]
    })

    charge = Stripe::Charge.create({
      :customer => customer.id,
      :amount => params[:amount].to_i * 100,
      :description => 'Description of your product',
      :currency => 'eur'
    })

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to new_payment_path
  end
end
