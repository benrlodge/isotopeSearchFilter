log = (m) ->
	console.log m

$ = jQuery




$.fn.BL_Searchable = (options) ->
	defaults = 
		itemSelector	:	$('.item')
		input 			:	$('#searchInput')
		item_list 		:	$('.search-item')
		item_name		:	$('.item-name')

		searchable 		: 	$('.searchable')

		all_items		: 	''  # change name later...
		search_items	:	[]

		filter_dom		:	$('.item-list')
		make_items		: 	$('.create-search-items')


	options = $.extend(defaults, options)
	




	searchAndHighlight = (searchTerm, selector, highlightClass, removePreviousHighlights) ->
		if searchTerm	

			selector = selector or "body" #use body as selector if none provided
			searchTermRegEx = new RegExp("(" + searchTerm + ")", "gi")
			matches = 0
			helper = {}


			helper.doHighlight = (node, searchTerm) ->

				if node.nodeType is 3
					if node.nodeValue.match(searchTermRegEx)
						matches++
						tempNode = document.createElement("span")
						tempNode.innerHTML = node.nodeValue.replace(searchTermRegEx, "<span class='" + highlightClass + "'>$1</span>")
						node.parentNode.replaceChild tempNode, node

						
						$('.item').removeClass('active').removeClass('inactive')

						$('.highlighted').closest('.item').addClass('active').siblings().addClass('inactive')




				else if node.nodeType is 1 and node.childNodes and not /(style|script)/i.test(node.tagName)
					$.each node.childNodes, (i, v) ->
						helper.doHighlight(node.childNodes[i], searchTerm)
						
			
			if removePreviousHighlights

				$("." + highlightClass).each (i, v) ->
					$parent = $(this).parent()
					$(this).contents().unwrap()
					$parent.get(0).normalize()
					return

			
			
			$.each $(selector).children(), (index, val) ->
				log "EACH LOOP"
				helper.doHighlight this, searchTerm
			

			return matches
			false





	@each ->

		# $("#searchfor").keyup -> search()

		$("#search-term").keyup ->
			$dom_search = $("#search-term").val()
			searchAndHighlight( $dom_search, ".item-container", "highlighted", true )
			
			if $dom_search == ''
				log 'empty'
				
				## REMOVE NODES
				

				$('.item').removeClass('inactive')
				$('.item-container').isotope
					filter: ''



			else		
				$('.item-container').isotope
					filter: '.active'
			
					
			



