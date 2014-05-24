(function() {
  var $, log;

  log = function(m) {
    return console.log(m);
  };

  $ = jQuery;

  $.fn.BL_Searchable = function(options) {
    var defaults, getFilterItems, makeItemList, removeDups, searchTags;
    defaults = {
      itemSelector: $('.item'),
      input: $('#searchInput'),
      item_list: $('.search-item'),
      item_name: $('.item-name'),
      searchable: $('.searchable'),
      all_items: '',
      search_items: [],
      filter_dom: $('.item-list'),
      make_items: $('.create-search-items')
    };
    options = $.extend(defaults, options);
    makeItemList = function() {
      var new_list;
      new_list = '';
      options.make_items.each(function() {
        var create_list;
        log("MAKING ITEMS LOOP");
        log("ORIGINAL LIST");
        create_list = $(this).text();
        log(create_list);
        log('REPLACE QUOTES');
        create_list = create_list.replace(/"/g, ",");
        create_list = create_list.replace(/,,/g, ",");
        log(create_list);
        log("SPLIT UP-----------------------------");
        create_list = create_list.split(' ');
        log(create_list);
        return new_list += create_list;
      });
      return new_list.split(',');
    };
    getFilterItems = function() {
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
      return options.all_items;
    };
    removeDups = function(items) {
      var uniqueNames;
      uniqueNames = [];
      $.each(items, function(i, el) {
        if ($.inArray(el, uniqueNames) === -1) {
          return uniqueNames.push(el);
        }
      });
      return uniqueNames;
    };
    searchTags = function(items) {
      options.input.autocomplete({
        source: items
      });
      return options.input.keypress(function(e) {
        var keyCode, typed;
        keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          typed = this.value.trim();
          options.searchable.closest('.item').removeClass('active');
          options.searchable.closest('.item').removeClass('inactive');
          return options.searchable.each(function() {
            if ($(this).text().indexOf(typed) >= 0) {
              return $(this).closest(options.itemSelector).addClass('active');
            }
          });
        }
      });
    };
    return this.each(function() {
      var finals, make_items_list;
      if (options.make_items.length > 0) {
        make_items_list = makeItemList();
      }
      options.search_items = getFilterItems();
      finals = make_items_list.concat(options.search_items);
      return searchTags(removeDups(finals));
    });
  };

}).call(this);
