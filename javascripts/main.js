(function() {
  var runSearch;

  $item_name.each(function() {
    var nameText;
    nameText = $(this).text();
    return allNames.push(nameText);
  });

  Input.autocomplete({
    source: allNames
  });

  searchBtn.click(function() {
    return runSearch();
  });

  runSearch = function() {
    var typed;
    log('runSearch()');
    typed = Input.val();
    return console.log(typed);
  };

  Input.on("autocompletechange change", function() {
    var typed;
    typed = this.value;
    console.log(typed);
    $item_name.removeClass('active');
    return $item_name.filter(function() {
      return $(this).text() === typed;
    }).closest('.item').addClass('active').siblings().addClass('inactive');
  }).change();

}).call(this);
