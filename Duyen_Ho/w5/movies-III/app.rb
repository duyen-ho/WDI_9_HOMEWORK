require 'sinatra'
require 'sinatra/reloader'
require 'httparty'
require 'pry'
require_relative 'db_config'
require_relative 'models/movie'


get '/' do
  erb :index
end

get '/search_results' do
  @user_input = params[:title]
  @results = HTTParty.get("http://omdbapi.com/?s=#{@user_input}")

  if @results['Response'] == 'False'
    redirect to "/error"
  end

  if @results['totalResults'] == '1'
    @imdb_id = @results['Search'][0]['imdbID']
    redirect to "/about?movie=#{@imdb_id}"
  end

  erb :search_results
end

get '/error' do
  erb :error
end

get '/about' do
  # get params from anchor tag query string
  @imdb_id = params[:movie]

  # search local moviesdb first
  local_movie = Movie.find_by(imdb_id: @imdb_id)
  # binding.pry

  # if movie doesn't exit, go to API
  if !local_movie
    @result = HTTParty.get("http://omdbapi.com/?i=#{@imdb_id}")
    # data mapped to about page

    # write new data to movies table
    new_movie = Movie.new

    new_movie.title = @result['Title']
    new_movie.year = @result['Year']
    new_movie.director = @result['Director']
    new_movie.writer = @result['Writer']
    new_movie.actors = @result['Actors']
    new_movie.plot = @result['Plot']
    new_movie.imdb_rating = @result['imdbRating']
    new_movie.run_time = @result['Runtime']
    new_movie.imdb_id = @result['imdbID']
    # remember to save!
    new_movie.save

  else
    # pull data from local_movie and send to about page
    @result = local_movie
    @result['Title'] = local_movie.title
    @result['Year'] = local_movie.year
    @result['Director'] = local_movie.director
    @result['Writer'] = local_movie.writer
    @result['Actors'] = local_movie.actors
    @result['Plot'] = local_movie.plot
    @result['imdbRating'] = local_movie.imdb_rating
    @result['Runtime'] = local_movie.run_time
  end
  erb :about
end


# Future considerations:
# store keys in db table to reflect API keys
# use loop to store, read and print values
# eg. Pedro's example - think about what data is needed in the db and code readability
