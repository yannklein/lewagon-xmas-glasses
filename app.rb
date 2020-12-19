require 'sinatra'
require 'sinatra/reloader'
require 'sinatra/activerecord'
require 'date'
require 'pry'

get '/' do
  erb :index
end

post '/selfie' do
  @image = params[:image]
  erb :selfie
end
