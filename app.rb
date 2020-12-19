require 'sinatra'
require 'sinatra/reloader'
require 'date'
require 'pry'

get '/' do
  erb :index
end

post '/selfie' do
  @image = params[:image]
  erb :selfie
end
