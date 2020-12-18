require 'sinatra'
require "sinatra/json"
require 'sinatra/reloader'
require 'json'
require 'open-uri'
require 'date'
require 'pry'

get '/' do
  erb :index
end
