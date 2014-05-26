log = (m) ->
	console.log m

$ = jQuery


$.fn.isotopeSearchFilter = (options) ->
	defaults = 
		itemsContainer	: 	$(".item-container")
		itemSelector	:	$('.item')
		inputSearch 	:	$('#search-term')
		match_count		: 	$('.match_count')
		description 	: 	$('.description')
		truncate 		:	false

	options = $.extend(defaults, options)
	

	# Isotope Filter Logic
	updateFilter = (val) ->
		options.itemsContainer.isotope
			filter: val
			layoutComplete: matchCount

		options.itemsContainer.isotope "on", "layoutComplete", (isoInstance, laidOutItems) ->
			matchCount(laidOutItems.length)

	#show number of matches
	matchCount = (count) ->
		options.match_count.html(count)


	searchDOM = (searchTerm) ->
		$('.item').removeClass('active')

		
		## NEED TO ADD ONLY FILTER IN ITEM CONTAINER - TODO
		$( ".item-container:contains(#{searchTerm})" ).closest('.item').addClass('active')
		updateFilter('.active')



	@each ->

		options.inputSearch.keyup ->
			if options.inputSearch.val() == ''
				updateFilter('')
				
			else		
				searchDOM( options.inputSearch.val() )
				updateFilter('.active')
			


					
			



