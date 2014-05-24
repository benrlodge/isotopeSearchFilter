log = (m) ->
	console.log m




$ = jQuery

$.fn.BL_Searchable = (options) ->
	defaults = 
		item 		:	$('.item')
		input 		:	$('#searchInput')
		item_list 	:	$('.item-list')
		item_name	:	$('.item-name')

		all_items	: 	''  # change name later...
		search_items:	[]

		filter_dom	:	$('.item-list')


	options = $.extend(defaults, options)
	


	getFilterItems = ->

		log 'getting fitler items'

		# Add comma to end of tag list if doesn't already have one
		options.item_list.each ->
			text = ($(this).text()).trim()
			lastChar = text.substr(text.length - 1)
			text += ',' if lastChar != ','
			options.all_items += text


		options.all_items = options.all_items.split(',')
		return removeDups(options.all_items)



	removeDups = (items) ->
		log 'remove dups'
		uniqueNames = []
		$.each items, (i, el) ->
			uniqueNames.push el  if $.inArray(el, uniqueNames) is -1
		return uniqueNames



	searchTags = (items) ->

		log items
		options.input.autocomplete source: items

		options.input.keypress (e) ->
			keyCode = e.keyCode || e.which
			if (keyCode == 13)

				
				typed = (@value).trim()
				options.item_list.closest('.item').removeClass('active')
				options.item_list.closest('.item').removeClass('inactive') 

				options.item_list.each ->
					if $(this).text().indexOf(typed) >= 0 
						$(this).closest(options.item).addClass('active') 


	@each ->
	

		log "init"

		options.search_items = getFilterItems()
		searchTags(options.search_items)








					
				
