(function() {
  var $, $item_name, Input, allNames, log, searchBtn;

  log = function(m) {
    return console.log(m);
  };

  $ = jQuery;

  $.fn.extend({
    searchfilter: function(options) {}
  }, allNames = [], Input = $('#searchInput'), searchBtn = $('#search-btn'), $item_name = $('.item-name'), $item_name.each(function() {
    var nameText;
    nameText = $(this).text();
    return allNames.push(nameText);
  }), Input.autocomplete({
    source: allNames
  }), Input.on("autocompletechange change", function() {
    var typed;
    typed = this.value;
    console.log(typed);
    $item_name.removeClass('active');
    return $item_name.filter(function() {
      return $(this).text() === typed;
    }).closest('.item').addClass('active').siblings().addClass('inactive');
  }).change());

}).call(this);
