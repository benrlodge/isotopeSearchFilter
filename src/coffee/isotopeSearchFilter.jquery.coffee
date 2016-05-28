# A jQuery plugin extension for MetaFizzy Isotope
# Author: Ben Lodge
# https://github.com/benrlodge
# http://www.benrlodge.com
# Licence: Do What the Fuck You Want (http://www.wtfpl.net)

$.fn.isotopeSearchFilter = (options) ->

  defaults =
    itemsContainer:  '.item-container'
    itemSelector: '.item'
    filtersSelector: '.filters'
    searchResultsClassSelector: '.active'
    inputSearch:  '#search-term'

  options = $.extend(defaults, options)
  activeClass = options.searchResultsClassSelector.replace('.','')

  # Helper to Case Insensitize search terms
  $.extend $.expr[":"],
    containsNC: (elem, i, match, array) ->
      (elem.textContent or elem.innerText or '')
        .toLowerCase()
        .indexOf((match[3] or '')
        .toLowerCase()) >= 0

  # Isotope Filter Logic
  updateFilter = (val) ->
    $(options.itemsContainer).isotope
      filter: val

  # Find Matched Items
  searchDOM = (searchTerm) ->
    $(options.itemSelector).removeClass(activeClass)

    $(options.itemsContainer)
      .find($( ":containsNC(#{searchTerm})" ))
      .closest(options.itemSelector)
      .addClass(activeClass)
    updateFilter(options.searchResultsClassSelector)

  # Check if any filters are active
  filterCheck = ->
    $(options.filtersSelector).hasClass(activeClass)

  @each ->
    $(options.inputSearch).keyup ->
      if $(options.inputSearch).val() is ''
        updateFilter('')
      else
        searchDOM($(options.inputSearch).val())
        updateFilter(options.searchResultsClassSelector)
