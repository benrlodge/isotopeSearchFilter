# isotopeSearchFilter jQuery plugin

#### This is a super-light jQuery plugin that combines internal page search functionality with the Isotope plugin

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


  // If using imagesLoaded:

  $(document).ready(function(){
    var $container = $('.item-container')
    
    imagesLoaded( '.item-container', function() {
      $container.isotope({
        itemSelector: '.item',
        layoutMode: 'fitRows' 
      }).isotopeSearchFilter();
    });
  })    


```

Available Options:

```javascript
  isotopeSearchFilter({
    itemsContainer: $(".item-container"),
    itemSelector: '.item',
    filtersSelector: '.filters',
    searchResultsClassSelector: '.active',
    inputSearch: $('#search-term')
  })

```

Dependencies
 - jQuery
 - Metafizzy Isotope [http://isotope.metafizzy.co/](http://isotope.metafizzy.co/)
 - If your content contains images use: [imagesloaded](https://github.com/desandro/imagesloaded).



### Related Plugins:

#### isotopeDropdownFilters: 
[https://github.com/benrlodge/isotopeDropdownFilters](https://github.com/benrlodge/isotopeDropdownFilters)

This is a jQuery plugin that makes it easy to incorporate dropdowns and multi-select filtering using the Isotope plugin.


### Contributions:

PRs and feature requests are encouraged. If you wish to contribute please make updates in the coffee file. 

