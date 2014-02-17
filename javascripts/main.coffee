




	# allNames = []
	# Input = $('#searchInput')
	# searchBtn = $('#search-btn')
	# $item_name = $('.item-name')


	$item_name.each () ->
		nameText = $(this).text()
		allNames.push(nameText)


	Input.autocomplete source: allNames


	searchBtn.click -> runSearch()

	runSearch = ->
		log 'runSearch()'
		typed = Input.val()
		console.log typed
		

	Input.on("autocompletechange change", ->
		typed = @value
		console.log typed
		$item_name.removeClass('active')

		$item_name.filter(->
			$(this).text() is typed
		).closest('.item').addClass('active').siblings().addClass('inactive')

	).change()
		
