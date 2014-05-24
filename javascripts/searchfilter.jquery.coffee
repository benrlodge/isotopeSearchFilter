log = (m) ->
	console.log m



$(document).ready -> BL_Searchable.init()



BL_Searchable = 

	input 		:	$('#searchInput')
	tags 		:	$('.tags')
	item_name	:	$('.item-name')

	all_tags 	: 	''  # change name later...
	array_names :	[]
	search_items:	[]



 
	init: ->
		@bindEvents()
		@search_items = @getTags()
		@searchTags(@search_items)





		

	bindEvents: ->
		scope = this
		@input.keypress (e) ->
			keyCode = e.keyCode || e.which
			if (keyCode == 13)
				scope.searchTags()
			


	getTags: ->
		scope = this

		# Add comma to end of tag list if doesn't already have one
		@tags.each ->
			text = $(this).text()
			lastChar = text.substr(text.length - 1)
			text += ',' if lastChar != ','
			scope.all_tags += text

		# Move tags into array
		all_tags_array = @all_tags.split(',')

		# Loop through names and toss in array
		@item_name.each ->
			name = $(this).text()
			scope.array_names.push(name)


		# Combine all searchable arrays
		return $searchable = this.array_names.concat(all_tags_array)




	searchTags: (items) ->
		scope = this

		@input.autocomplete source: items
			
		@input.on("autocompletechange change", ->
			log 'input autocompletechange'
			typed = @value
			scope.item_name.removeClass('active')
			scope.item_name.removeClass('inactive')


			scope.item_name.filter(->
				$(this).text() is typed
			).closest('.item').addClass('active').siblings().addClass('inactive')

		).change()
	
