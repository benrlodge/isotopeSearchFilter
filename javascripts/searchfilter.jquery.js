(function() {
  var BL_Searchable, log;

  log = function(m) {
    return console.log(m);
  };

  $(document).ready(function() {
    return BL_Searchable.init();
  });

  BL_Searchable = {
    input: $('#searchInput'),
    tags: $('.tags'),
    item_name: $('.item-name'),
    all_tags: '',
    array_names: [],
    search_items: [],
    init: function() {
      this.bindEvents();
      this.search_items = this.getTags();
      return this.searchTags(this.search_items);
    },
    bindEvents: function() {
      var scope;
      scope = this;
      return this.input.keypress(function(e) {
        var keyCode;
        keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          return scope.searchTags();
        }
      });
    },
    getTags: function() {
      var $searchable, all_tags_array, scope;
      scope = this;
      this.tags.each(function() {
        var lastChar, text;
        text = $(this).text();
        lastChar = text.substr(text.length - 1);
        if (lastChar !== ',') {
          text += ',';
        }
        return scope.all_tags += text;
      });
      all_tags_array = this.all_tags.split(',');
      this.item_name.each(function() {
        var name;
        name = $(this).text();
        return scope.array_names.push(name);
      });
      return $searchable = this.array_names.concat(all_tags_array);
    },
    searchTags: function(items) {
      var scope;
      scope = this;
      this.input.autocomplete({
        source: items
      });
      return this.input.on("autocompletechange change", function() {
        var typed;
        log('input autocompletechange');
        typed = this.value;
        scope.item_name.removeClass('active');
        scope.item_name.removeClass('inactive');
        return scope.item_name.filter(function() {
          return $(this).text() === typed;
        }).closest('.item').addClass('active').siblings().addClass('inactive');
      }).change();
    }
  };

}).call(this);
