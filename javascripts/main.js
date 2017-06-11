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
		])
	.constant('serverRequestAddr', {
		// kanti : "http://192.168.91.88:5000"
	})
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'view/home.html', // express route http://localhost:3000/home
			controller: 'HomeCtrl'
		})
		.when('/My_modal_pro', {
			templateUrl: 'view/my_modal_pro.html', // express route http://localhost:3000/home
			controller: 'MyProModalCtrl'
		})
		.when('/form_element', {
			templateUrl: 'view/form_element.html', // express route http://localhost:3000/home
			controller: 'FormElementCtrl'
		})
		.when('/login', {
			templateUrl: 'view/login.html', // express route http://localhost:3000/home
			controller: 'LoginCtrl'
		})
		.when('/pagination', {
			templateUrl: 'view/pagination.html', // express route http://localhost:3000/home
			controller: 'LoginCtrl'
		})
		.when('/gridview', {
			templateUrl: 'view/gridview.html', // express route http://localhost:3000/home
			controller: 'GridCtrl'
		})
		.when('/videoplay', {
			templateUrl: 'view/videoplay.html', // express route http://localhost:3000/home
			controller: 'VideoCtrl'
		})
		.when('/cms', {
			templateUrl: 'view/cms.html', // express route http://localhost:3000/home
			controller: 'CMSCtrl'
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
			$('.selector-box tbody td').text('Click play to start')
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
		   	$('.selector-box td:eq(3)').text(this.outerHTML.substr(0, this.outerHTML.indexOf('>')+1));
		   }
		},'*');
		});
		
		/*=====  End of jquery event block  ======*/
		


	}]);

})();