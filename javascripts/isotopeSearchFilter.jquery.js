(function() {
  $.fn.isotopeSearchFilter = function(options) {
    var activeClass, defaults, filterCheck, searchDOM, updateFilter;
    defaults = {
      itemsContainer: $(".item-container"),
      itemSelector: '.item',
      filtersSelector: '.filters',
      searchResultsClassSelector: '.active',
      inputSearch: $('#search-term')
    };
    options = $.extend(defaults, options);
    activeClass = options.searchResultsClassSelector.replace('.', '');
    $.extend($.expr[":"], {
      containsNC: function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
      }
    });
    updateFilter = function(val) {
      return options.itemsContainer.isotope({
        filter: val
      });
    };
    searchDOM = function(searchTerm) {
      $(options.itemSelector).removeClass(activeClass);
      options.itemsContainer.find($(":containsNC(" + searchTerm + ")")).closest(options.itemSelector).addClass(activeClass);
      return updateFilter(options.searchResultsClassSelector);
    };
    filterCheck = function() {
      return $(options.filtersSelector).hasClass(activeClass);
    };
    return this.each(function() {
      return options.inputSearch.keyup(function() {
        if (options.inputSearch.val() === '') {
          return updateFilter('');
        } else {
          searchDOM(options.inputSearch.val());
          return updateFilter(options.searchResultsClassSelector);
        }
      });
    });
  };

}).call(this);
