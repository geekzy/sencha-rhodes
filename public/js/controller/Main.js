Ext.define('GettingStarted.controller.Main', {
	extend : 'Ext.app.Controller',
	
	config : {
		refs : {			
			form : 'formpanel',
			sendBtn : 'button[action=send]',
			resetBtn : 'button[action=reset]',
			list : 'nestedlist'
		},
		control : {
			sendBtn : {tap : 'doSend'},
			resetBtn : {tap : 'doReset'},
			list : {itemtap : 'doTap'}
		}
	},
	
	init : function() {},
	mask : function() { Ext.Viewport.getActiveItem().setMasked(true); },
	unmask : function() { Ext.Viewport.getActiveItem().setMasked(false); },
	
	doSend : function() {
		var store = Ext.getStore('contactStore');		
		// submit form
		this.getForm().submit({
			url: '/app/Contact/do_send',
			success : function() {
				var data = Ext.JSON.decode(arguments[2]);
				console.debug(data);
				console.debug('Sent!!');
				Ext.Viewport.getActiveItem().setActiveItem(3);
				// refresh store upon success
				store.load();
			}
		});
		
		// clear form
		this.getForm().reset();
		Ext.Msg.alert('Alert', 'Sent');
	},
	
	doReset : function() {		
		var store = Ext.getStore('contactStore'),
			that = this, reset = Ext.emptyFn;
			
		reset = function() {
			console.debug(arguments);
			this.mask();
			Ext.Ajax.request({
				url: '/app/Contact/do_reset',
				success: function(response){
					var text = response.responseText;
					// process server response here
					Ext.Msg.alert('Alert', 'Database has been reset');
					store.load();
					that.unmask();
				}
			});
		}
		
		reset.call(this);
	},
	
	doTap : function(nestedList, list, index, element, post) {
		this.getList().getDetailCard().setHtml(post.get('content'));
	}
});