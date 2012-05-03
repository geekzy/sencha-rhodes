require 'rho/rhocontroller'
require 'helpers/browser_helper'

class StartController < Rho::RhoController
  include BrowserHelper
  
  def index
	  redirect '/app'
  end
end