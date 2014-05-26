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
		, matchCountUpdate



	# Update Match Counts
	matchCountUpdate = (val) ->
		matches = $('.item:visible').length
		options.match_count.html(matches)


	# Truncate Text
	truncateDescription = () ->
		$description = options.description
		
		$description.each ->
			text = $.trim($(this).text())
			#check if longer than string length then only do next if longer
			short = text.substring(0,184) + '...'
			
			# Hide rest of long version

			$(this).html(text)		




	# Remove highlighted items
	removeHighs = ->		
		log 'remove highs'
		$('.item').css('border','none')
		
		$("." + options.highlightClass).each (i, v) ->
			$parent = $(this).parent()
			$(this).contents().unwrap()
			$parent.get(0).normalize()



	# Searching Logic
	searchAndHighlight = (searchTerm, removePreviousHighlights) ->
		if searchTerm	
			selector = options.itemSelector
			searchTermRegEx = new RegExp("(" + searchTerm + ")", "gi")
			helper = {}


			helper.doHighlight = (node, searchTerm) ->

				# if Text Node
				if node.nodeType is 3
					if node.nodeValue.match(searchTermRegEx)

						log 'MATCH:-----------------'
				

						# Add Highlighting
						tempNode = document.createElement("span")
						tempNode.innerHTML = node.nodeValue.replace(
							searchTermRegEx, "<span class='" + options.highlightClass + "'>$1</span>"
						)
						node.parentNode.replaceChild tempNode, node

						options.itemSelector.removeClass('active').removeClass('inactive')
						$('.highlighted').closest('.item').addClass('active').siblings().addClass('inactive')


				# If Element Node search again
				else if node.nodeType is 1 and node.childNodes and not /(style|script)/i.test(node.tagName)
					log 'NODE TYPE 1'
					$.each node.childNodes, (i, v) ->
						helper.doHighlight(node.childNodes[i], searchTerm)
						


			
			removeHighs() if removePreviousHighlights
				
			$.each selector.children(), (index, val) ->
				helper.doHighlight this, searchTerm	
			
			matchCountUpdate()






	init = ->
		matchCountUpdate()
		truncateDescription() if options.truncate 






	@each ->

		init()

		options.inputSearch.keyup ->
			if options.inputSearch.val() == ''
				removeHighs()
				options.itemSelector.removeClass('inactive')

				updateFilter('')
				

			else		
				searchAndHighlight( options.inputSearch.val(), true )
				updateFilter('.active')
			


					
			



