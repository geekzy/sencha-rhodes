require 'rho/rhoapplication'

class AppApplication < Rho::RhoApplication
  def initialize
    @tabs = nil
    @@toolbar = nil
    super
	
	@default_menu = {
		"Home" => :home,
		"Log" => :log,
		"Close" => :close
	}
  end
end
