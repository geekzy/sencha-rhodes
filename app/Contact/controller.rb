require 'rho/rhocontroller'
require 'helpers/browser_helper'
require 'json'

class ContactController < Rho::RhoController
  include BrowserHelper
  
  def index
    redirect '/app'
  end
  
  def do_ajax(json)  
    @response['headers']['Content-Type'] = 'application/json;charset=utf-8'
    render :string => ::JSON.generate(json), :use_layout_on_ajax => true
  end
  
  def do_list
    list = Contact.find(:all)
    list.each do |user|
      user[:leaf] = true
    end
    json = {:success => true, :data => list}

    do_ajax json
  end

  def do_send
    json = @params.merge({:success => true})
    Contact.create(@params)

    do_ajax json
  end
  
  def do_reset
    Rhom::Rhom.database_full_reset    
    json = {:success => true, :msg => 'Database has been reset.'}
    puts json[:msg]
    do_ajax json
  end
end