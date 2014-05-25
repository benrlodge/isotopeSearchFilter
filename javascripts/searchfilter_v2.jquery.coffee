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

	options = $.extend(defaults, options)
	

	# Remove highlighted items
	removeHighs = ->		
		$("." + options.highlightClass).each (i, v) ->
			$parent = $(this).parent()
			$(this).contents().unwrap()
			$parent.get(0).normalize()




	matchCountUpdate = (val) ->
		log 'updating count'
		matches = $('.item:visible').length
		options.match_count.html(matches)




	searchAndHighlight = (searchTerm, selector, removePreviousHighlights) ->
		if searchTerm	

			selector = selector or "body" #use body as selector if none provided
			searchTermRegEx = new RegExp("(" + searchTerm + ")", "gi")
			
			helper = {}

			helper.doHighlight = (node, searchTerm) ->

				if node.nodeType is 3
					if node.nodeValue.match(searchTermRegEx)

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
			
			matchCountUpdate()



	sliceBio = () ->
		$description = options.description
		
		$description.each ->
			text = $.trim($(this).text())
			#check if longer than string length then only do next if longer
			short = text.substring(0,184) + '...'
			
			# Hide rest of long version

			$(this).html(text)		


	init = ->
		matchCountUpdate()
		sliceBio()



	@each ->

		init()

		options.inputSearch.keyup ->
			if options.inputSearch.val() == ''
				removeHighs()
				options.itemSelector.removeClass('inactive')
				options.itemsContainer.isotope
					filter: ''
				, matchCountUpdate
				

			else		
				searchAndHighlight( options.inputSearch.val(), options.itemsContainer, true )
				options.itemsContainer.isotope 
					filter: '.active'
				, matchCountUpdate
			


					
			



