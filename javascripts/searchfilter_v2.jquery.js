(function() {
  var $, log;

  log = function(m) {
    return console.log(m);
  };

  $ = jQuery;

  $.fn.BL_Searchable = function(options) {
    var defaults, searchAndHighlight;
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
    searchAndHighlight = function(searchTerm, selector, highlightClass, removePreviousHighlights) {
      var helper, matches, searchTermRegEx;
      if (searchTerm) {
        selector = selector || "body";
        searchTermRegEx = new RegExp("(" + searchTerm + ")", "gi");
        matches = 0;
        helper = {};
        helper.doHighlight = function(node, searchTerm) {
          var tempNode;
          if (node.nodeType === 3) {
            if (node.nodeValue.match(searchTermRegEx)) {
              matches++;
              tempNode = document.createElement("span");
              tempNode.innerHTML = node.nodeValue.replace(searchTermRegEx, "<span class='" + highlightClass + "'>$1</span>");
              node.parentNode.replaceChild(tempNode, node);
              $('.item').removeClass('active').removeClass('inactive');
              return $('.highlighted').closest('.item').addClass('active').siblings().addClass('inactive');
            }
          } else if (node.nodeType === 1 && node.childNodes && !/(style|script)/i.test(node.tagName)) {
            return $.each(node.childNodes, function(i, v) {
              return helper.doHighlight(node.childNodes[i], searchTerm);
            });
          }
        };
        if (removePreviousHighlights) {
          $("." + highlightClass).each(function(i, v) {
            var $parent;
            $parent = $(this).parent();
            $(this).contents().unwrap();
            $parent.get(0).normalize();
          });
        }
        $.each($(selector).children(), function(index, val) {
          log("EACH LOOP");
          return helper.doHighlight(this, searchTerm);
        });
        return matches;
        return false;
      }
    };
    return this.each(function() {
      return $("#search-term").keyup(function() {
        var $dom_search;
        $dom_search = $("#search-term").val();
        searchAndHighlight($dom_search, ".item-container", "highlighted", true);
        if ($dom_search === '') {
          log('empty');
          $('.item').removeClass('inactive');
          return $('.item-container').isotope({
            filter: ''
          });
        } else {
          return $('.item-container').isotope({
            filter: '.active'
          });
        }
      });
    });
  };

}).call(this);
