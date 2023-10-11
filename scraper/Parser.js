class Parser {
	parse($) {
		const parsedData = [];

		const birthsHeadline = $('h2:contains("Births")')
		const bdayLists = birthsHeadline.nextAll('ul').slice(0, 3)
		const bdayLiElements = bdayLists.find('li')
		
		bdayLiElements.each((i, elem) => {
			const bdayLiElement = $(elem)
			const linkElements = bdayLiElement.find('a');

			const name = this.parseName(linkElements);

			const record = {
				name: name,
			}

			parsedData.push(record)
		})

		return parsedData;
	}

	parseName(linkElements) {
		const firstLiElem = linkElements.eq(0);
		const secondLiElem = linkElements.eq(1);

		let name; 

		if ( this.startsWithDigit(firstLiElem.attr('title')) ) {
			name = secondLiElem.attr('title');
		} else {
			name = firstLiElem.attr('title');
		}

		return name;
	}

	startsWithDigit(str) {
		return /^\d/.test(str)
	}

}

module.exports = Parser;
