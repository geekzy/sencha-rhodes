Ext.Loader.setConfig({ enabled : true });
Ext.application({
	name : 'GettingStarted',
	appFolder : '/public/js',
	
	controllers : ['Main'],
	views : ['Viewport'],
	
	launch : function() { 
		Ext.create('GettingStarted.view.Viewport', {
			fullscreen: true
		}); 
	}
});