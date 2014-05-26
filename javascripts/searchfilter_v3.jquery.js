(function() {
  var $, log;

  log = function(m) {
    return console.log(m);
  };

  $ = jQuery;

  $.fn.BL_Searchable = function(options) {
    var defaults, filterCallback, searchDOM, updateFilter;
    defaults = {
      itemsContainer: $(".item-container"),
      itemSelector: $('.item'),
      inputSearch: $('#search-term'),
      highlightClass: 'highlighted',
      match_count: $('.match_count'),
      description: $('.description'),
      truncate: false
    };
    options = $.extend(defaults, options);
    updateFilter = function(val) {
      return options.itemsContainer.isotope({
        filter: val
      }, filterCallback);
    };
    filterCallback = function() {
      return log('filter callback');
    };
    searchDOM = function(searchTerm) {
      $('.item').removeClass('active');
      $(":contains(" + searchTerm + ")").closest('.item').addClass('active');
      return updateFilter('.active');
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
