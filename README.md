# isotopeSearchFilter jquery plugin

### This is a jQuery plugin that combines internal page search functionality with the Isotope plugin


### How to Use: 

[Load the isotope plugin](http://isotope.metafizzy.co/) and then you can just chain isotopeSearchFilter() right onto it like you can see below.

```javascript

	$(document).ready(function(){
		var $container = $('.item-container')
		
		$container.isotope({
			itemSelector: '.item',
			layoutMode: 'fitRows'	
		}).isotopeSearchFilter();

	})

```