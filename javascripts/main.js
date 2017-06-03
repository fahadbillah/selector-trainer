(function() {
	'use strict';
	/**
	* MEAN Module
	*
	* Description
	*/
	angular
	.module('AUTONIC', [
		'ngRoute',
		'oc.lazyLoad',
		])
	.constant('serverRequestAddr', {
		// kanti : "http://192.168.91.88:5000"
	})
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'view/home.html', // express route http://localhost:3000/home
			controller: 'HomeCtrl',
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([
						'javascripts/controllers/HomeCtrl.js'
						])
				}]
			}
		})
		.when('/registration', {
			templateUrl: 'view/registration.html', // express route http://localhost:3000/home
			controller: 'RegistrationCtrl',
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([
						'javascripts/controllers/RegistrationCtrl.js'
						])
				}]
			}
		})
		.when('/login', {
			templateUrl: 'view/login.html', // express route http://localhost:3000/home
			controller: 'LoginCtrl',
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([
						'javascripts/controllers/LoginCtrl.js'
						])
				}]
			}
		})
		.otherwise('/');
		$locationProvider.hashPrefix('');
	}])
	.run(['$rootScope', function ($rootScope) {

		$rootScope.alert = {};
		$rootScope.selector = {
			xPath: '',
			cssPath: '',
		};

		var navMenu = [{
			id: 0,
			name: 'browse by category',
			href: '',
			parentMenu: null
		},{
			id: 1,
			name: 'clothing',
			href: '',
			parentMenu: 0
		},{
			id: 2,
			name: 'test 1',
			href: '',
			parentMenu: 1
		},{
			id: 3,
			name: 'test 2',
			href: '',
			parentMenu: 1
		},{
			id: 4,
			name: 'shoes',
			href: '',
			parentMenu: 0
		},{
			id: 5,
			name: 'accessories',
			href: '',
			parentMenu: 0
		},{
			id: 6,
			name: 'baby',
			href: '',
			parentMenu: 0
		},{
			id: 7,
			name: 'home',
			href: '',
			parentMenu: 0
		},{
			id: 8,
			name: 'furniture',
			href: '',
			parentMenu: 0
		},{
			id: 9,
			name: 'electronics',
			href: '',
			parentMenu: 0
		},{
			id: 10,
			name: 'movies',
			href: '',
			parentMenu: 0
		},{
			id: 11,
			name: 'recommendations',
			href: '',
			parentMenu: null
		},{
			id: 12,
			name: 'weekly ad',
			href: '',
			parentMenu: null
		},{
			id: 13,
			name: 'find stores',
			href: '',
			parentMenu: 12
		},{
			id: 14,
			name: 'registries & lists',
			href: '',
			parentMenu: 12
		},{
			id: 15,
			name: 'REDcard',
			href: '',
			parentMenu: 13
		},{
			id: 16,
			name: 'deals & coupons',
			href: '',
			parentMenu: null
		},{
			id: 17,
			name: 'subscriptions',
			href: '',
			parentMenu: null
		},{
			id: 18,
			name: 'pharmacy',
			href: '',
			parentMenu: null
		}];

		$rootScope.prevMenu = false;
		$rootScope.navMenu = navMenu;
		$rootScope.resetMenu = function() {
			$rootScope.prevMenu = false;
			$rootScope.navMenu = navMenu.filter(function(e, i){
				if (e.parentMenu === null) {
					return e;
				}
			})
		};

		$rootScope.changeMenu = function(id, showBack) {
			$rootScope.navMenu = navMenu.filter(function(e, i){
				if (e.parentMenu === id) {
					return e;
				}
			})
			$rootScope.prevMenu = showBack;
		};
		$rootScope.changeMenu(null, false);


		/*==========================================
		=            jquery event block            =
		==========================================*/
		
		

	  $('#wrapper.toggled').on('click', '#menu-toggle', function(e) {
	      e.preventDefault();
	      $("#wrapper").toggleClass("toggled");
	  });

	  var getXPath = function( element )
	  {
	      var xpath = '';
	      for ( ; element && element.nodeType == 1; element = element.parentNode )
	      {
	          var id = $(element.parentNode).children(element.tagName).index(element) + 1;
	          id > 1 ? (id = '[' + id + ']') : (id = '');
	          xpath = '/' + element.tagName.toLowerCase() + id + xpath;
	      }
	      return xpath;
	  }

	  var getCSSPath = function ( element ) {
	  	element = $(element);
	    if (element.length != 1) throw 'Requires one element.';

	    var path, node = element;
	    while (node.length) {
	        var realNode = node[0], name = realNode.localName;
	        if (!name) break;
	        name = name.toLowerCase();

	        var parent = node.parent();

	        var siblings = parent.children(name);
	        if (siblings.length > 1) { 
	            name += ':eq(' + siblings.index(realNode) + ')';
	        }

	        path = name + (path ? '>' + path : '');
	        node = parent;
	    }

	    return path;
		};

	  var getIDSelector = function ( element ) {
	  	element = $(element);
	    if (element.length != 1) throw 'Requires one element.';

	    return element.attr('id') || 'No ID Available';
		};

		$('.power-off').click(function(event) {
		  $("body").off('click', '*');
		  $("body").off('mouseenter', '*');
		  $("body").off('mouseleave', '*');
			$('.power-on').removeClass('hide');
			$('.power-off').addClass('hide');
			$('tbody td').text('Click play to start')
		});

		$('.power-on').click(function(event) {
			$('.power-off').removeClass('hide');
			$('.power-on').addClass('hide');
		  $("body").on({
		    mouseenter: function () {
		    	$('.hover-border').removeClass('hover-border');
		    	$(this).addClass('hover-border');
		       // $(this).addClass("hover");
		    },
		    mouseleave:function () {
		       $(this).removeClass('hover-border');
		    },
		    click: function(e) {
	  	    e.stopPropagation();
		    	$('.selector-box td:eq(0)').text(getXPath(this));
		    	$('.selector-box td:eq(1)').text(getCSSPath(this));
		    	$('.selector-box td:eq(2)').text(getIDSelector(this));
		    	$('.selector-box td:eq(3)').text(this.outerHTML);
		    }
			},'*');
		});
		
		/*=====  End of jquery event block  ======*/
		


	}]);

})();