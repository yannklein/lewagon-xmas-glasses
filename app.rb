require 'dotenv/load'
require 'sinatra'
require 'sinatra/reloader'
require 'date'
require 'pry'
require 'cloudinary'

get '/' do
  erb :index
end

post '/selfie' do
  selfie_id = ('a'..'z').to_a.sample(15).join
  Cloudinary::Uploader.upload(
    params[:image],
    {
      public_id: selfie_id,
      api_key: ENV['CLOUDINARY_KEY'],
      api_secret: ENV['CLOUDINARY_SECRET'],
      cloud_name: ENV['CLOUD_NAME']
    }
  )
  redirect "/selfie/#{selfie_id}"
end

get '/selfie/:id' do
  @image = params[:id].empty? ? '/images/sample.png' : "https://res.cloudinary.com/yanninthesky/image/upload/#{params[:id]}.png"
  erb :selfie
end
