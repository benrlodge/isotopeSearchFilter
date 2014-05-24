log = (m) ->
	console.log m



$(document).ready -> BL_Searchable.init()




BL_Searchable = 

	item 		:	$('.item')
	input 		:	$('#searchInput')
	item_list 	:	$('.item-list')
	item_name	:	$('.item-name')

	all_items	: 	''  # change name later...
	search_items:	[]

	filter_dom	:	$('.item-list')


 
	init: ->
		@search_items = @getFilterItems()
		@searchTags(@search_items)



	getFilterItems: ->
		scope = this

		# Add comma to end of tag list if doesn't already have one
		@item_list.each ->
			text = ($(this).text()).trim()
			lastChar = text.substr(text.length - 1)
			text += ',' if lastChar != ','
			scope.all_items += text


		@all_items = @all_items.split(',')
		return @removeDups(@all_items)




	removeDups: (items) ->
		uniqueNames = []
		$.each items, (i, el) ->
			uniqueNames.push el  if $.inArray(el, uniqueNames) is -1
		return uniqueNames



	searchTags: (items) ->
		scope = this
		log items
		@input.autocomplete source: items

		@input.keypress (e) ->
			keyCode = e.keyCode || e.which
			if (keyCode == 13)

				
				typed = (@value).trim()
				scope.item_list.closest('.item').removeClass('active')
				scope.item_list.closest('.item').removeClass('inactive') 

				scope.item_list.each ->
					if $(this).text().indexOf(typed) >= 0 
						$(this).closest(scope.item).addClass('active') 

				
			
