var app = new Framework7({
	// App root element
	root: '#app',
	// App Name
	name: 'Your Reading',
	// App id
	id: 'com.myapp.test',
	// Enable swipe panel
	theme: 'ios',
	// Add default routes
	routes: routes,
	smartSelect: {
		closeOnSelect: true,
	},
	sheet: {
		backdrop: true,
		scroll: true,
	},
	dialog: {
		buttonOk: '確認',
		buttonCancel: '取消',
	},
	touch: {
		// iosTouchRipple: true,
	},
	swiper: {
		observer: true,
		observeParents: true,
	},
	methods: {
		// alert: function() {
		// 	app.dialog.alert('Hello World');
		// 	this.alert()
		// }
		// alertDialog: function() {
			// app.dialog.open(el);
			// app.dialog.alert('Hello World');
			// this.alert()
		// }
		// openSheet: function(el){
			// app.sheet.open(el);
		// }
	},
});

var mainView = app.views.create('.view-main');

//happy router
// app.views.main.router.navigate('/CAL/result/')