log = (m) ->
	console.log m



$ = jQuery
$.fn.extend

	searchfilter: (options) ->
	
		# settings =
		# 	selector	: this
		# 	item : ''
		# 	input : ''
		# 	searchBtn : ''
		# 	searchItem : ''

		# settings = $.extend settings, options

		# log = (msg) ->
		# 	console.log msg


		# return @each () ->

		# 	selector = settings.selector
		# 	item = settings.item
		# 	input = settings.input
		# 	searchBtn = settings.searchBtn
		# 	item_name = settings.searchItem



	allNames = []
	Input = $('#searchInput')
	
	searchBtn = $('#search-btn')
	$item_name = $('.item-name')


	$item_name.each () ->
		nameText = $(this).text()
		allNames.push(nameText)

	Input.autocomplete source: allNames
		

	Input.on("autocompletechange change", ->
		typed = @value
		console.log typed
		$item_name.removeClass('active')

		$item_name.filter(->
			$(this).text() is typed
		).closest('.item').addClass('active').siblings().addClass('inactive')

	).change()
		
