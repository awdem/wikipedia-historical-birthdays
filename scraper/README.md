A web scraper that pulls all the birthdays listed on wikipedia for each day of the year and saves them to a database. I wrote this before I realized I could use the wikimedia API to get the HTML for each page much more easily than directly scraping the website. I will update this to use the API once I've finished the 2nd stage of the project.

TODO:
- memory management: restructure program to save/export data as it scrapes, rather than one after the other
- swap to using wiki API
- error handling and logging?
