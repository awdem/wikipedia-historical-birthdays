class Parser {
	parse($) {
		const birthsHeadline = $('h2:contains("Births")')
		const bdayLists = birthsHeadline.nextAll('ul').slice(0, 3)
		const bdayLiElements = bdayLists.find('li')

		bdayLiElements.each((i, elem) => {
			const bday = $(elem)
			console.log(bday.text())
		})
	}
}


module.exports = Parser;
