(function() {
  var $, log;

  log = function(m) {
    return console.log(m);
  };

  $ = jQuery;

  $.fn.isotopeSearchFilter = function(options) {
    var defaults, matchCount, searchDOM, updateFilter;
    defaults = {
      itemsContainer: $(".item-container"),
      itemSelector: $('.item'),
      inputSearch: $('#search-term'),
      match_count: $('.match_count'),
      description: $('.description'),
      truncate: false
    };
    options = $.extend(defaults, options);
    $.extend($.expr[":"], {
      containsNC: function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
      }
    });
    updateFilter = function(val) {
      options.itemsContainer.isotope({
        filter: val,
        layoutComplete: matchCount
      });
      return options.itemsContainer.isotope("on", "layoutComplete", function(isoInstance, laidOutItems) {
        return matchCount(laidOutItems.length);
      });
    };
    matchCount = function(count) {
      return options.match_count.html(count);
    };
    searchDOM = function(searchTerm) {
      $('.item').removeClass('active');
      options.itemsContainer.find($(":containsNC(" + searchTerm + ")")).closest('.item').addClass('active');
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