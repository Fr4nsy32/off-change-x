class ExchangeController < ApplicationController
  def index

  end

  def convert
    amount = params[:amount].to_f
    source_currency = params[:source_currency]
    target_currency = params[:target_currency]

    exchange_rate = 1.0

    converted_amount = amount * exchange_rate

    @result = {
      amount: amount,
      source_currency: source_currency,
      target_currency: target_currency,
      exchange_rate: exchange_rate,
      converted_amount: converted_amount
    }
  end
end
