log = (m) ->
	console.log m

log 'main.coffee'


#Requires jquery UI (autocomplete) 
#Requires jquery UI css (for default styles)



allNames = []
nameInput = $('#nameInput')
searchBtn = $('#nameSearch')

$name = $('.name')
$name.each () ->
	nameText = $(this).text()
	allNames.push(nameText)

nameInput.autocomplete source: allNames

searchBtn.click ->
	runSearch()

runSearch = ->
	typed = $('#nameInput').val()
	console.log typed
	
nameInput.on("autocompletechange change", ->
	typed = @value
	console.log typed
	$name.removeClass('active')

	$name.filter(->
		$(this).text() is typed
	).closest('.person').addClass('active').siblings().addClass('inactive')

).change()
	
