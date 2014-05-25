(function() {
  var $, log;

  log = function(m) {
    return console.log(m);
  };

  $ = jQuery;

  $.fn.BL_Searchable = function(options) {
    var defaults, init, matchCountUpdate, removeHighs, searchAndHighlight, sliceBio;
    defaults = {
      itemsContainer: $(".item-container"),
      itemSelector: $('.item'),
      inputSearch: $('#search-term'),
      highlightClass: 'highlighted',
      match_count: $('.match_count'),
      description: $('.description')
    };
    options = $.extend(defaults, options);
    removeHighs = function() {
      return $("." + options.highlightClass).each(function(i, v) {
        var $parent;
        $parent = $(this).parent();
        $(this).contents().unwrap();
        return $parent.get(0).normalize();
      });
    };
    matchCountUpdate = function(val) {
      var matches;
      log('updating count');
      matches = $('.item:visible').length;
      return options.match_count.html(matches);
    };
    searchAndHighlight = function(searchTerm, selector, removePreviousHighlights) {
      var helper, searchTermRegEx;
      if (searchTerm) {
        selector = selector || "body";
        searchTermRegEx = new RegExp("(" + searchTerm + ")", "gi");
        helper = {};
        helper.doHighlight = function(node, searchTerm) {
          var tempNode;
          if (node.nodeType === 3) {
            if (node.nodeValue.match(searchTermRegEx)) {
              tempNode = document.createElement("span");
              tempNode.innerHTML = node.nodeValue.replace(searchTermRegEx, "<span class='" + options.highlightClass + "'>$1</span>");
              node.parentNode.replaceChild(tempNode, node);
              options.itemSelector.removeClass('active').removeClass('inactive');
              return $('.highlighted').closest('.item').addClass('active').siblings().addClass('inactive');
            }
          } else if (node.nodeType === 1 && node.childNodes && !/(style|script)/i.test(node.tagName)) {
            return $.each(node.childNodes, function(i, v) {
              return helper.doHighlight(node.childNodes[i], searchTerm);
            });
          }
        };
        if (removePreviousHighlights) {
          removeHighs();
        }
        $.each(selector.children(), function(index, val) {
          return helper.doHighlight(this, searchTerm);
        });
        return matchCountUpdate();
      }
    };
    sliceBio = function() {
      var $description;
      $description = options.description;
      return $description.each(function() {
        var short, text;
        text = $.trim($(this).text());
        short = text.substring(0, 184) + '...';
        return $(this).html(text);
      });
    };
    init = function() {
      matchCountUpdate();
      return sliceBio();
    };
    return this.each(function() {
      init();
      return options.inputSearch.keyup(function() {
        if (options.inputSearch.val() === '') {
          removeHighs();
          options.itemSelector.removeClass('inactive');
          return options.itemsContainer.isotope({
            filter: ''
          }, matchCountUpdate);
        } else {
          searchAndHighlight(options.inputSearch.val(), options.itemsContainer, true);
          return options.itemsContainer.isotope({
            filter: '.active'
          }, matchCountUpdate);
        }
      });
    });
  };

}).call(this);
