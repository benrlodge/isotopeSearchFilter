log = (m) ->
	console.log m

$ = jQuery


$.fn.isotopeSearchFilter = (options) ->
	defaults = 
		itemsContainer	: 	$(".item-container")
		itemSelector	:	$('.item')
		inputSearch		:	$('#search-term')
		match_count		:	$('.match_count')
		description 	: 	$('.description')
		truncate 		:	false

	options = $.extend(defaults, options)
	

	
	# Helper: Case Insensitize :contains
	$.extend $.expr[":"],
		containsNC: (elem, i, match, array) ->
    		(elem.textContent or elem.innerText or "").toLowerCase().indexOf((match[3] or "").toLowerCase()) >= 0




	# Isotope Filter Logic
	updateFilter = (val) ->
		options.itemsContainer.isotope
			filter: val
			layoutComplete: matchCount

		options.itemsContainer.isotope "on", "layoutComplete", (isoInstance, laidOutItems) ->
			matchCount(laidOutItems.length)


	# Show number of matches
	matchCount = (count) ->
		options.match_count.html(count)



	# Find Matched Items
	searchDOM = (searchTerm) ->
		$('.item').removeClass('active')
		
		options.itemsContainer
			.find($( ":containsNC(#{searchTerm})" ))
			.closest('.item')
			.addClass('active')
		updateFilter('.active')



	@each ->

		options.inputSearch.keyup ->
			if options.inputSearch.val() == ''
				updateFilter('')
				
			else		
				searchDOM( options.inputSearch.val() )
				updateFilter('.active')
			


					
			



