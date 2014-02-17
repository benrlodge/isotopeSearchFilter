(function() {
  var $, log;

  log = function(m) {
    return console.log(m);
  };

  log('and lets do this');

  $ = jQuery;

  $.fn.extend({
    searchfilter: function(options) {
      var settings;
      settings = {
        selector: this,
        item: '',
        input: '',
        searchBtn: '',
        searchItem: ''
      };
      settings = $.extend(settings, options);
      log = function(msg) {
        return console.log(msg);
      };
      return this.each(function() {
        var input, item, item_name, searchBtn, selector, something;
        selector = settings.selector;
        item = settings.item;
        input = settings.input;
        searchBtn = settings.searchBtn;
        item_name = settings.searchItem;
        something = function() {
          return log(item_name);
        };
        return something();
      });
    }
  });

}).call(this);
