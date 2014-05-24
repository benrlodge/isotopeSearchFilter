(function() {
  var BL_Searchable, log;

  log = function(m) {
    return console.log(m);
  };

  $(document).ready(function() {
    return BL_Searchable.init();
  });

  BL_Searchable = {
    item: $('.item'),
    input: $('#searchInput'),
    item_list: $('.item-list'),
    item_name: $('.item-name'),
    all_items: '',
    search_items: [],
    filter_dom: $('.item-list'),
    init: function() {
      this.search_items = this.getFilterItems();
      return this.searchTags(this.search_items);
    },
    getFilterItems: function() {
      var scope;
      scope = this;
      this.item_list.each(function() {
        var lastChar, text;
        text = ($(this).text()).trim();
        lastChar = text.substr(text.length - 1);
        if (lastChar !== ',') {
          text += ',';
        }
        return scope.all_items += text;
      });
      this.all_items = this.all_items.split(',');
      return this.removeDups(this.all_items);
    },
    removeDups: function(items) {
      var uniqueNames;
      uniqueNames = [];
      $.each(items, function(i, el) {
        if ($.inArray(el, uniqueNames) === -1) {
          return uniqueNames.push(el);
        }
      });
      return uniqueNames;
    },
    searchTags: function(items) {
      var scope;
      scope = this;
      log(items);
      this.input.autocomplete({
        source: items
      });
      return this.input.keypress(function(e) {
        var keyCode, typed;
        keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          typed = this.value.trim();
          scope.item_list.closest('.item').removeClass('active');
          scope.item_list.closest('.item').removeClass('inactive');
          return scope.item_list.each(function() {
            if ($(this).text().indexOf(typed) >= 0) {
              return $(this).closest(scope.item).addClass('active');
            }
          });
        }
      });
    }
  };

}).call(this);
