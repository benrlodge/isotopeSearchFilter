
$.fn.isotopeSearchFilter = (options) ->

	defaults = 
		itemsContainer: 	$(".item-container")
		itemSelector: '.item'
		filtersSelector: '.filters'
		searchResultsClassSelector: '.active'
		inputSearch:	$('#search-term')



	console.log defaults
	console.log 'sharks'
	console.log options

	options = $.extend(defaults, options)
	activeClass = options.searchResultsClassSelector.replace('.','')





	# Helper to Case Insensitize search terms
	$.extend $.expr[":"],
		containsNC: (elem, i, match, array) ->
    		(elem.textContent or elem.innerText or "").toLowerCase().indexOf((match[3] or "").toLowerCase()) >= 0

	# Isotope Filter Logic
	updateFilter = (val) ->
		options.itemsContainer.isotope
			filter: val

	# Find Matched Items
	searchDOM = (searchTerm) ->
		options.itemsContainer
			.removeClass(activeClass)
			.find($( ":containsNC(#{searchTerm})" ))
			.closest(options.itemSelector)
			.addClass(activeClass)
		updateFilter(options.searchResultsClassSelector)


	# Check if any filters are active
	filterCheck = ->
		return $(options.filtersSelector).hasClass(activeClass)


	@each ->

		options.inputSearch.keyup ->
			if options.inputSearch.val() == ''
				updateFilter('')
			else		
				searchDOM( options.inputSearch.val() )
				updateFilter(options.searchResultsClassSelector)

			

			



