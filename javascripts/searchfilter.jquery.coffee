log = (m) ->
	console.log '--------------------------------------------'
	console.log m
	console.log '--------------------------------------------'




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
	

	getClass = (obj) ->
		return "undefined"  if typeof obj is "undefined"
		return "null"  if obj is null
		Object::toString.call(obj).match(/^\[object\s(.*)\]$/)[1]






	makeItemList = ->
		new_list = ''
		options.make_items.each ->
			new_list = $(this).text()

			new_list += new_list.split(' ')
			#Remove empty spaces......


		# NEED TO COMBINE THIS WITH REST OF ITEMS
		return new_list.split(',')





	# Run through DOM and grab up all items to be searched
	# item_list are comma separated lists
	getFilterItems = ->
		# Add comma to end of tag list if doesn't already have one
		options.item_list.each ->
			text = ($(this).text()).trim()


			lastChar = text.substr(text.length - 1)
			text += ',' if lastChar != ','
			options.all_items += text


		options.all_items = options.all_items.split(',')


		# return removeDups(options.all_items)
		return options.all_items







	# Remove duplicated search items
	removeDups = (items) ->

		uniqueNames = []
		$.each items, (i, el) ->
			uniqueNames.push el  if $.inArray(el, uniqueNames) is -1

		return uniqueNames



	searchTags = (items) ->

		options.input.autocomplete source: items
		
		options.input.keypress (e) ->
			keyCode = e.keyCode || e.which
			if (keyCode == 13)

				typed = (@value).trim()


				options.searchable.closest('.item').removeClass('active')
				
				options.searchable.closest('.item').removeClass('inactive') 

				options.searchable.each ->

					if $(this).text().indexOf(typed) >= 0 
						$(this).closest(options.itemSelector).addClass('active') 


	@each ->
	

		
		# Creating List of all text
		make_items_list = makeItemList() if options.make_items.length > 0		
		
		# Existing List
		options.search_items = getFilterItems()

		
		# Final Combined List
		finals = make_items_list.concat(options.search_items)



		
		searchTags( removeDups(finals) )








					
				
