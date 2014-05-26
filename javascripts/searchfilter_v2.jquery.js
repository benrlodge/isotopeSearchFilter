(function() {
  var $, log;

  log = function(m) {
    return console.log(m);
  };

  $ = jQuery;

  $.fn.BL_Searchable = function(options) {
    var defaults, init, matchCountUpdate, removeHighs, searchAndHighlight, truncateDescription, updateFilter;
    defaults = {
      itemsContainer: $(".item-container"),
      itemSelector: $('.item'),
      inputSearch: $('#search-term'),
      highlightClass: 'highlighted',
      match_count: $('.match_count'),
      description: $('.description'),
      truncate: false
    };
    options = $.extend(defaults, options);
    updateFilter = function(val) {
      return options.itemsContainer.isotope({
        filter: val
      }, matchCountUpdate);
    };
    matchCountUpdate = function(val) {
      var matches;
      matches = $('.item:visible').length;
      return options.match_count.html(matches);
    };
    truncateDescription = function() {
      var $description;
      $description = options.description;
      return $description.each(function() {
        var short, text;
        text = $.trim($(this).text());
        short = text.substring(0, 184) + '...';
        return $(this).html(text);
      });
    };
    removeHighs = function() {
      log('remove highs');
      $('.item').css('border', 'none');
      return $("." + options.highlightClass).each(function(i, v) {
        var $parent;
        $parent = $(this).parent();
        $(this).contents().unwrap();
        return $parent.get(0).normalize();
      });
    };
    searchAndHighlight = function(searchTerm, removePreviousHighlights) {
      var helper, searchTermRegEx, selector;
      if (searchTerm) {
        selector = options.itemSelector;
        searchTermRegEx = new RegExp("(" + searchTerm + ")", "gi");
        helper = {};
        helper.doHighlight = function(node, searchTerm) {
          var tempNode;
          if (node.nodeType === 3) {
            if (node.nodeValue.match(searchTermRegEx)) {
              log('MATCH:-----------------');
              tempNode = document.createElement("span");
              tempNode.innerHTML = node.nodeValue.replace(searchTermRegEx, "<span class='" + options.highlightClass + "'>$1</span>");
              node.parentNode.replaceChild(tempNode, node);
              options.itemSelector.removeClass('active').removeClass('inactive');
              return $('.highlighted').closest('.item').addClass('active').siblings().addClass('inactive');
            }
          } else if (node.nodeType === 1 && node.childNodes && !/(style|script)/i.test(node.tagName)) {
            log('NODE TYPE 1');
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
    init = function() {
      matchCountUpdate();
      if (options.truncate) {
        return truncateDescription();
      }
    };
    return this.each(function() {
      init();
      return options.inputSearch.keyup(function() {
        if (options.inputSearch.val() === '') {
          removeHighs();
          options.itemSelector.removeClass('inactive');
          return updateFilter('');
        } else {
          searchAndHighlight(options.inputSearch.val(), true);
          return updateFilter('.active');
        }
      });
    });
  };

}).call(this);
