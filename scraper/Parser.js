class Parser {
	parse($) {
		const parsedData = [];

		const pageTitleText = $('head > title').text();

		const birthsHeadline = $('h2:contains("Births")')
		const bdayLists = birthsHeadline.nextAll('ul').slice(0, 3)
		const bdayLiElements = bdayLists.find('li')
		
		bdayLiElements.each((i, elem) => {
			const bdayLiElement = $(elem)
			const linkElements = bdayLiElement.find('a');

			const nameElement =  $(this.findNameElement(linkElements));

			const name = nameElement.attr('title');
			const wikiUrl = "https://en.wikipedia.org" + nameElement.attr('href');

			const day = pageTitleText.match(/\b\d{1,2}\b/)[0];
			const month = this.monthNametoNumber(pageTitleText.match(/\w+/)[0]);
			const year = bdayLiElement.text().match(/\b\d{1,4}\b/)[0];

			const record = {
				name: name,	
				wikiUrl: wikiUrl,
				bday: `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
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

	turnMonthNametoNumber(monthName) {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const monthNumber = months.indexOf(monthName) + 1;

		return monthNumber.toString();
	}
}

module.exports = Parser;
