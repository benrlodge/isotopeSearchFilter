(function() {
  var $, log;

  log = function(m) {
    return console.log(m);
  };

  $ = jQuery;

  $.fn.BL_Searchable = function(options) {
    var defaults, matchCountShow, matchCounter, removeHighs, searchAndHighlight;
    defaults = {
      itemsContainer: $(".item-container"),
      itemSelector: $('.item'),
      inputSearch: $('#search-term'),
      highlightClass: 'highlighted',
      match_count: $('.match_count')
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
    matchCountShow = function() {
      var matches;
      matches = matchCounter.value();
      return options.match_count.html(matches);
    };
    matchCounter = (function() {
      var i;
      i = 0;
      return {
        increment: function() {
          return i++;
        },
        value: function() {
          return i;
        },
        reset: function() {
          return i = 0;
        }
      };
    })();
    searchAndHighlight = function(searchTerm, selector, removePreviousHighlights) {
      var helper, searchTermRegEx;
      if (searchTerm) {
        selector = selector || "body";
        searchTermRegEx = new RegExp("(" + searchTerm + ")", "gi");
        matchCounter.reset();
        log('reset to: ' + matchCounter.value());
        helper = {};
        helper.doHighlight = function(node, searchTerm) {
          var tempNode;
          if (node.nodeType === 3) {
            if (node.nodeValue.match(searchTermRegEx)) {
              matchCounter.increment();
              log('Node MATCH: ' + matchCounter.value());
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
        return matchCountShow();
      }
    };
    return this.each(function() {
      return options.inputSearch.keyup(function() {
        searchAndHighlight(options.inputSearch.val(), options.itemsContainer, true);
        if (options.inputSearch.val() === '') {
          removeHighs();
          options.itemSelector.removeClass('inactive');
          return options.itemsContainer.isotope({
            filter: ''
          });
        } else {
          return options.itemsContainer.isotope({
            filter: '.active'
          });
        }
      });
    });
  };

}).call(this);
