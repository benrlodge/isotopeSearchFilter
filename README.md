# isotopeSearchFilter jquery plugin

#### This is a jQuery plugin that combines internal page search functionality with the Isotope plugin

### Demo:
[http://benrlodge.github.io/isotopeSearchFilter/](http://benrlodge.github.io/isotopeSearchFilter/)

### How to Use: 

[Load up the isotope plugin](http://isotope.metafizzy.co/), then chain on isotopeSearchFilter().

If your sorting containers use images, I recommend David DeSandro's [imagesloaded](https://github.com/desandro/imagesloaded).

```javascript

	$(document).ready(function(){
		var $container = $('.item-container')
		
		$container.isotope({
			itemSelector: '.item',
			layoutMode: 'fitRows'	
		}).isotopeSearchFilter();

	})

```

Options available to override include the name of the container that includes your items, and the text input box. See the source for more detail.


```javascript
	isotopeSearchFilter({
		itemsContainer	: 	$(".item-container"),
		inputSearch		:	$('#search-term'),
	})

```

### Related Plugins:

#### isotopeDropdownFilters: 
[https://github.com/benrlodge/isotopeDropdownFilters](https://github.com/benrlodge/isotopeDropdownFilters)

This is a jQuery plugin that makes it easy to incorporate dropdowns and filtering using the Isotope plugin.