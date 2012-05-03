Ext.define('GettingStarted.view.Viewport', {
	extend : 'Ext.tab.Panel',
	
	config : {
		tabBarPosition : 'bottom',
		items : [
			{
				title: 'Home',
				iconCls: 'home',
				cls: 'home',
				html: [
					'<img src="http://staging.sencha.com/img/sencha.png" />',
					'<h1>Welcome to Sencha Touch</h1>',
					"<p>You're creating the Getting Started app. This demonstrates how ",
					"to use tabs, lists and forms to create a simple app</p>",
					'<h2>Sencha Touch (2.0.0)</h2>'
				].join("")
			},			
			{	// This is the recent blogs page. It uses a tree store to load its data from blog.json
				xtype: 'nestedlist',
				title: 'Blog',
				iconCls: 'star',
				cls: 'blog',
				displayField: 'title',

				store: Ext.create('Ext.data.TreeStore', {
					fields: ['title', 'link', 'author', 'contentSnippet', 'content', {
						name: 'leaf',
						defaultValue: true
					}],

					root: { leaf: false },
					proxy: {
						type: 'jsonp',
						url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://feeds.feedburner.com/SenchaBlog',
						reader: {
							type: 'json',
							rootProperty: 'responseData.feed.entries'
						}
					}
				}),
				
				detailCard: {
					xtype: 'panel',
					scrollable: true,
					styleHtmlContent: true
				},

				// When a leaf node is tapped on this function is called. Whatever we return is
				// shown on the page here we show a page containing the blog post's text
				getDetailCard: function(node) {
					if (node) {
						return {
							xtype: 'panel',
							scrollable: true,
							html: node.get('text')
						};
					}
				}
			},
			{	// This is the contact page, which features a form and a button. The button submits the form
				xtype: 'formpanel',
				title: 'Contact Us',
				iconCls: 'compose',				
				layout: 'vbox',

				items: [
					{
						xtype: 'fieldset',
						title: 'Contact Us',
						instructions: 'Email address is optional',

						items: [
							{
								xtype: 'textfield',
								label: 'Name',
								name: 'name'
							},
							{
								xtype: 'emailfield',
								label: 'Email',
								name: 'email'
							},
							{
								xtype: 'textareafield',
								label: 'Message',
								name: 'message',
								height: 90
							}
						]
					},
					{
						xtype: 'button',
						text: 'Send',
						ui: 'confirm',
						action: 'send'
					}
				]
			},
			{			
				xtype: 'list',				
				title: 'Contacts',
				iconCls: 'user',
				cls: 'contact',				
				
				items: [
					{
						xtype: 'toolbar',
						docked: 'top',
						title: 'Contact List',
						items: [
							{
								xtype: 'button',
								text: 'Reset',
								ui: 'action',
								action: 'reset'
							},
							{xtype: 'spacer'}
						]
					}
				],
				
				itemTpl: '{name}',				
				store: Ext.create('Ext.data.Store', {
					storeId: 'contactStore',
					fields: ['name', 'email', 'message'],
					proxy: {
						type: 'ajax',
						url: '/app/Contact/do_list',
						reader: {
							type: 'json',
							rootProperty: 'data'
						}
					},
					autoLoad: true
				})
			}
		],
		activate : function() {
			console.debug('xxx');
			console.debug(arguments);
		},
		show : function() {
			console.debug('yyy');
			console.debug(arguments);
		},
		activeitemchange : function() {
			console.debug('zzz');
			console.debug(arguments);
		}
	}
});