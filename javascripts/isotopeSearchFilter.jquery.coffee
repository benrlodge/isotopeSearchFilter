$.fn.isotopeSearchFilter = (options) ->
	defaults = 
		itemsContainer	: 	$(".item-container")
		inputSearch		:	$('#search-term')


	options = $.extend(defaults, options)
	
	# Helper: Case Insensitize :contains
	$.extend $.expr[":"],
		containsNC: (elem, i, match, array) ->
    		(elem.textContent or elem.innerText or "").toLowerCase().indexOf((match[3] or "").toLowerCase()) >= 0


	# Isotope Filter Logic
	updateFilter = (val) ->
		options.itemsContainer.isotope
			filter: val


	# Find Matched Items
	searchDOM = (searchTerm) ->
		$('.item').removeClass('active')
		
		options.itemsContainer
			.find($( ":containsNC(#{searchTerm})" ))
			.closest('.item')
			.addClass('active')
		updateFilter('.active')


	# Check if any filters are active
	filterCheck = ->
		return $('.filters').hasClass('active')



	@each ->

		options.inputSearch.keyup ->

			if options.inputSearch.val() == ''
				updateFilter('')

			else		
				searchDOM( options.inputSearch.val() )
				updateFilter('.active')
			

			



