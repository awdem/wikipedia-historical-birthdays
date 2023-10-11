class Parser {
	parse($) {
		const parsedData = [];

		const birthsHeadline = $('h2:contains("Births")')
		const bdayLists = birthsHeadline.nextAll('ul').slice(0, 3)
		const bdayLiElements = bdayLists.find('li')
		
		bdayLiElements.each((i, elem) => {
			const bdayLiElement = $(elem)
			const linkElements = bdayLiElement.find('a');

			const nameElement =  this.findNameElement(linkElements);

			const name = $(nameElement).attr('title');
			const wikiUrl = "https://en.wikipedia.org" + $(nameElement).attr('href');

			const record = {
				name: name,	
				wikiUrl: wikiUrl,
			}

			parsedData.push(record)
		})

		return parsedData;
	}

	findNameElement(linkElements) {
		const firstLiElem = linkElements.eq(0);
		const secondLiElem = linkElements.eq(1);

		return this.startsWithDigit(firstLiElem.attr('title')) ? secondLiElem : firstLiElem
	}

	startsWithDigit(str) {
		return /^\d/.test(str)
	}

}

module.exports = Parser;
