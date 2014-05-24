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

	options = $.extend(defaults, options)
	

	# Remove highlighted items
	removeHighs = ->		
		$("." + options.highlightClass).each (i, v) ->
			$parent = $(this).parent()
			$(this).contents().unwrap()
			$parent.get(0).normalize()



	# Combine matching functions
	matchCountShow = ->

		matches = matchCounter.value()
		options.match_count.html(matches)


	matchCounter = (->

		i = 0
		increment: -> i++
		value: -> i
		reset: -> i = 0

	)()




	searchAndHighlight = (searchTerm, selector, removePreviousHighlights) ->
		if searchTerm	

			selector = selector or "body" #use body as selector if none provided
			searchTermRegEx = new RegExp("(" + searchTerm + ")", "gi")
			
			matchCounter.reset()
			
			log 'reset to: ' + matchCounter.value()

			helper = {}


			helper.doHighlight = (node, searchTerm) ->

				if node.nodeType is 3
					if node.nodeValue.match(searchTermRegEx)
						matchCounter.increment()

						log 'Node MATCH: ' + matchCounter.value()
						tempNode = document.createElement("span")
						tempNode.innerHTML = node.nodeValue.replace(searchTermRegEx, "<span class='" + options.highlightClass + "'>$1</span>")
						node.parentNode.replaceChild tempNode, node

						options.itemSelector.removeClass('active').removeClass('inactive')
						$('.highlighted').closest('.item').addClass('active').siblings().addClass('inactive')



				else if node.nodeType is 1 and node.childNodes and not /(style|script)/i.test(node.tagName)
					$.each node.childNodes, (i, v) ->
						helper.doHighlight(node.childNodes[i], searchTerm)
						
			
			removeHighs() if removePreviousHighlights
				
			
			$.each selector.children(), (index, val) ->
				helper.doHighlight this, searchTerm
			
			
			matchCountShow()

			





	@each ->

		options.inputSearch.keyup ->
			
			searchAndHighlight( options.inputSearch.val(), options.itemsContainer, true )


			if options.inputSearch.val() == ''
				removeHighs()
				options.itemSelector.removeClass('inactive')
				options.itemsContainer.isotope filter: ''
				
				# matchCount.showDOM()
				# Update Counts

			else		
				options.itemsContainer.isotope filter: '.active'
			
					
			



