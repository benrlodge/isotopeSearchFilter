(function() {
  var $, log;

  log = function(m) {
    return console.log(m);
  };

  $ = jQuery;

  $.fn.BL_Searchable = function(options) {
    var defaults, getFilterItems, removeDups, searchTags;
    defaults = {
      item: $('.item'),
      input: $('#searchInput'),
      item_list: $('.item-list'),
      item_name: $('.item-name'),
      all_items: '',
      search_items: [],
      filter_dom: $('.item-list')
    };
    options = $.extend(defaults, options);
    getFilterItems = function() {
      log('getting fitler items');
      options.item_list.each(function() {
        var lastChar, text;
        text = ($(this).text()).trim();
        lastChar = text.substr(text.length - 1);
        if (lastChar !== ',') {
          text += ',';
        }
        return options.all_items += text;
      });
      options.all_items = options.all_items.split(',');
      return removeDups(options.all_items);
    };
    removeDups = function(items) {
      var uniqueNames;
      log('remove dups');
      uniqueNames = [];
      $.each(items, function(i, el) {
        if ($.inArray(el, uniqueNames) === -1) {
          return uniqueNames.push(el);
        }
      });
      return uniqueNames;
    };
    searchTags = function(items) {
      log(items);
      options.input.autocomplete({
        source: items
      });
      return options.input.keypress(function(e) {
        var keyCode, typed;
        keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          typed = this.value.trim();
          options.item_list.closest('.item').removeClass('active');
          options.item_list.closest('.item').removeClass('inactive');
          return options.item_list.each(function() {
            if ($(this).text().indexOf(typed) >= 0) {
              return $(this).closest(options.item).addClass('active');
            }
          });
        }
      });
    };
    return this.each(function() {
      log("init");
      options.search_items = getFilterItems();
      return searchTags(options.search_items);
    });
  };

}).call(this);
