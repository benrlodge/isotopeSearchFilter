(function() {
  var $name, allNames, log, nameInput, runSearch, searchBtn;

  log = function(m) {
    return console.log(m);
  };

  log('main.coffee');

  allNames = [];

  nameInput = $('#nameInput');

  searchBtn = $('#nameSearch');

  $name = $('.name');

  $name.each(function() {
    var nameText;
    nameText = $(this).text();
    return allNames.push(nameText);
  });

  nameInput.autocomplete({
    source: allNames
  });

  searchBtn.click(function() {
    return runSearch();
  });

  runSearch = function() {
    var typed;
    typed = $('#nameInput').val();
    return console.log(typed);
  };

  nameInput.on("autocompletechange change", function() {
    var typed;
    typed = this.value;
    console.log(typed);
    $name.removeClass('active');
    return $name.filter(function() {
      return $(this).text() === typed;
    }).closest('.person').addClass('active').siblings().addClass('inactive');
  }).change();

}).call(this);
