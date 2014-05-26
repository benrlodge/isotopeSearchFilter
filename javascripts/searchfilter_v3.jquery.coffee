log = (m) ->
	console.log m

$ = jQuery


$.fn.BL_Searchable = (options) ->
	defaults = 
		itemsContainer	: 	$(".item-container")
		itemSelector	:	$('.item')
		inputSearch 	:	$('#search-term')
		highlightClass 	: 	'highlighted'
		match_count		: 	$('.match_count')
		description 	: 	$('.description')
		truncate 		:	false

	options = $.extend(defaults, options)
	

	# Isotope Filter Logic
	updateFilter = (val) ->
		options.itemsContainer.isotope
			filter: val
		, filterCallback


	filterCallback = ->
		log 'filter callback'




	searchDOM = (searchTerm) ->
		$('.item').removeClass('active')
		$( ":contains(#{searchTerm})" ).closest('.item').addClass('active')
		updateFilter('.active')



	@each ->

		options.inputSearch.keyup ->
			if options.inputSearch.val() == ''
				updateFilter('')
				

			else		
				searchDOM( options.inputSearch.val() )
				updateFilter('.active')
			


					
			



