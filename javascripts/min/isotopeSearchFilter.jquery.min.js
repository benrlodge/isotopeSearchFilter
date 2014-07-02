(function() {
  $.fn.isotopeSearchFilter = function(options) {
    var defaults, filterCheck, searchDOM, updateFilter;
    defaults = {
      itemsContainer: $(".item-container"),
      inputSearch: $('#search-term')
    };
    options = $.extend(defaults, options);
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
      $('.item').removeClass('active');
      options.itemsContainer.find($(":containsNC(" + searchTerm + ")")).closest('.item').addClass('active');
      return updateFilter('.active');
    };
    filterCheck = function() {
      return $('.filters').hasClass('active');
    };
    return this.each(function() {
      return options.inputSearch.keyup(function() {
        if (options.inputSearch.val() === '') {
          return updateFilter('');
        } else {
          searchDOM(options.inputSearch.val());
          return updateFilter('.active');
        }
      });
    });
  };

}).call(this);
