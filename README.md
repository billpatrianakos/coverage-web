# Coverage Web

> The official web client for Coverage

Coverage is an open source health insurance coverage finder. Just answer a few simple questions and Coverage will return a list of health insurance plans available in your area along with how much of a government (Obamacare) subsidy you're eligible to receive to help pay your premiums each month.

## Why open source this?

Insurance companies get rich by making insurance confusing. Most people end up choosing plans they don't understand, that don't cover the doctors they want to go to, have high premiums *and* out-of-pocket costs and just plain suck.

Meanwhile insurance agents get charged huge sums of money for insurance quote engines that are ugly, buggy, and display publicly available data for a fee. 

Coverage helps people find the health insurance plan that's right for their needs and budget, putting health care above profits. Coverage is completely free and open source software for use by both consumers and businesses alike. I don't make a dime off of this although anyone who uses this can if they wanted to. Open sourcing this is just the right thing to do.

## Setup

*Coverage requires Node.js > v5.4.1 and the following installed globally:*

- Bower
- Gulp (local package and CLI)
- PM2
- Mocha
- Browserify
- Run `npm install -g bower gulp-cli mocha pm2 browserify` to install all global dependencies at once

Once all global packages have been installed just run `npm install` to install all required dependencies. 


## Run it locally

Make sure you've installed all dependencies before proceeding. 

To start a local development server run `gulp`

This one command will do the following:

- Start the application server locally
- Watch all JS, LESS, and most other important files and directories for changes
- The watch tasks will transpile LESS to CSS, JSX to regular JavaScript, lint your scripts, package your scripts using Browserify, and more. 

Now visit `http://localhost:3000` and you'll see... a 404 error. Thats because Coverage does not come with a homepage. There are routes set up for every controller file in the app (like `/quotes`, `/login`, `/signup`, etc.). The Coverage philosophy is to provide you the APIs and functionality you need to run the app and its up to you to implement any marketing or landing pages. We're giving you an insurance quote engine and leaving the customization up to you.

## Deploying

Coming soon...

## Contributing

We welcome contributions. [See the contributing file](CONTRIBUTING.md). Here's the short version:

1. Fork this repository to your account using the Fork button
2. Clone your fork and switch to the `develop` branch using `git checkout -b develop` to get the latest changes on the `develop` branch
3. Add this repository as an upstream with `git remote add upstream https://github.com/billpatrianakos/coverage-web.git`
4. Now pull down the latest changes from develop with `git pull upstream develop`
5. Branch off of `develop` into your own private branch. Make changes. Push to your fork. Then start a new pull request and ask for your own unique branch to be merged into `develop`

More about our branching strategy can be found in the Contributing file. 

### Code Style

Clean code is good code. Clean code is happy code. [More on code style in `CONTRIBUTING.md`](CONTRIBUTING.md).

## License

Coverage Web is licensed under the MIT License. You can [read the full license here](License) but the gist of it is this:

- You may use this code for free
- You may use this code for commercial or non-commercial purposes
- You are not required to publish your changes to the code
- You do no hold the author or contributors liable for anything
- You must give credit to the original license in some form. I prefer a [link to my personal website](http://billpatrianakosme) but simply leaving my name in the license file will suffice


### Disclaimer

Coverage works by making requests to an external API to get quotes and subsidy data. In order to run quotes you must either build your own quoting API or sign up for [Q, the quoting API](https://q.aploquote.com/docs). The data used to generate quotes is available for download for free from [Data.Healthcare.gov](http://data.healthcare.gov) and the formula for estimating insurance subsidies is also freely available by doing a quick Google search. Coverage has been built from the ground up and does not use code from any other project besides the open source libraries it depends on. __Remember: all data output from this software is 100% free and public knowledge! If you can download the Healthcare.gov data sets then you can make your own insurance plan finder.__

__To get API credentials__ open up a new issue on this repository and I'll set you up with a set of credentials. Remember, this is only if you choose to use my [Q API](https://q.aplqouote.com/docs). You're free to [download the required data sets for free from the federal government](https://data.healthcare.gov) and run your own quoting API.
