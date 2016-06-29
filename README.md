# Coverage Web

> The official web client for Coverage

Coverage is an open source health insurance coverage finder. Just answer a few simple questions and Coverage will return a list of health insurance plans available in your area along with how much of a government subsidy you're eligible to receive to help pay your premiums each month.

## Setup

Once you've forked or cloned the project, setup is easy. Follow the steps below and heed to warnings about project dependencies.

*Coverage requires Node.js >= v5.4.1 and the following installed globally:*

- Bower
- Gulp
- PM2
- Mocha
- Browserify

Once all global packages have been installed run `npm install && bower install` to install all required dependencies. 
=======
### Installing all dependencies

1. Run `npm install -g bower gulp-cli mocha pm2 browserify` to install all global dependencies at once.
2. Once all global packages have been installed just run `npm install && bower install` to install all required project dependencies

### Securing secret data

Coverage gets all of it's important runtime configuration options in the environment (Node's `process.env` will return an object containing your environment variables). Rather than using a solution like `dotenv` I've opted to use a simple shell script instead. The script sets environment variables by exporing variables in the terminal environment. 

1. Copy `envvars.sh.sample` to `envvars.sh` (you *__must__* name it this exact name as our `.gitignore` file is set up to ignore it so your secret API keys don't get leaked all over GitHub)
2. Edit `envvars.sh` in your favorite text editor. Change all of the variable values that apply to your situation

In production you should use a solution like PM2 to set your environment configs. The `envvars.sh` file is reserved for development and testing use only.
>>>>>>> origin/develop

## Run it locally

Make sure you've installed all dependencies before proceeding. 

1. Set environment variables with `source envvars.sh`. You only need to source the `envvars.sh` file once per terminal session. It only needs to be run in the terminal window/tab that will be running the local web server and *only in development and test environments*
2. Start a local development server by simply running `gulp`. The `gulp` command will invoke the default Gulp task and do the following:

- Try to set environment variables (currently not working so we `source envvars.sh` first for now)
- Watch all JS, LESS, and most other important files and directories for changes
  - The watch tasks will transpile LESS to CSS, JSX (React) to regular JavaScript, lint your scripts, package your scripts using Browserify, and more
- Start a local development server

Now visit [`http://localhost:9000`](http://localhost:9000) and you'll see... a 404 error. Thats because Coverage does not come with a homepage. There are routes set up for every controller file in the app (like `/quotes`, `/login`, `/signup`, etc.). The Coverage philosophy is to provide you the APIs and functionality you need to run the app and its up to you to implement any marketing or landing pages. We're giving you an insurance quote engine client and leaving the customization up to you.

## Deploying

We recommend Nginx proxied to a Node app monitored by [PM2](https://github.com/Unitech/pm2). More deployment instructions and advice coming soon...

## Getting access to the Quoting API

Coverage is pretty useless without access to an external API that'll return insurance quote results. For that reason I have some advice for how to deal with this.

### Method 1: Using the Q API

The data used to generate quote results is hosted at [the official Q website](http://q.aploquote.com/docs). You must have a client ID and a secret key to call the official Q (Q is for Quotes API). To get these credentials please open an issue or directly email me for access or more information.

### Method 2: Roll your own data API

__Alternatively__ you can host the data yourself and connect Coverage Web to your own insurance plan API. The data sets are 100%, completely free, open source, and maintained by the Federal Government at [Data.HealthCare.gov](http://data.healthcare.gov). Here is a [direct link to the data required to run your own insurance quoting API](https://data.healthcare.gov/browse?limitTo=datasets&utf8=✓). *Hint: You're looking for 7 QHP data files. Convert/export/download those into CSV files and import them into your database of choice then build an API around it. Yeah, I know, easier said than done but if you want to be totally self-sufficient you can use this data.

If you go this route you'll just need to make sure that the data input/output is consistent with how Q accepts and returns data. You can find all of this by reading [the Q docs](http://q.aploquote.com/docs)


## Tips, tricks, and advice

__Remember__, Coverage is only an API *client*. It needs to query for plan results from an API that will respond with a JSON array of government provided health insurance plans. Please either ask for access to Q (which I host and may ask you to pay for access depending on your proposed use - it's a case by case basis) or use the [direct link to the data](http://data.healthcare.gov) to create your own simple quoting API. It's easy. Simply set up an endpoint that'll accept demographic information and return an array of plans based on the input. See [the official Q docs](http://q.aploquote.com/docs) as an example to model your API off of.

__If you use the Q API__

We use a similar authentication scheme as AWS. We give you a client ID and secret. Your requests to Q should be signed using your secret token. Instructions and details are available on the [Q documentation site](http://q.aploquote.com/docs).

__If you run your own data API__

My advice to you is to model your API client off of our [`q-client` API library](https://www.npmjs.com/package/q-client) and understand the the Affordable Care Act and how it handles insurance quoting.

## Contributing

We welcome contributions. [See the contributing file](CONTRIBUTING.md). Here's the short version:

1. Create your own fork
2. Always cut your own branches off of the `develop` branch

## How to calculate Obamacare (ACA) subsidies?

Check out these resources listed in order of helpfulness:

- [About.com article](http://healthinsurance.about.com/od/reform/a/How-Does-The-Premium-Tax-Credit-Health-Insurance-Subsidy-Work.htm) - This is how we got the original subsidy estimate formula
- [Excellent explanation of the subsidy calculation from Value Penguin](http://www.valuepenguin.com/understanding-aca-subsidies) - This will help you understand how the subsidy works but is not as helpful as the About.com article to get the actual formula

### Code Style

Clean code is good code. Clean code is happy code. In general, follow the example set in the project code and read [more about code style in `CONTRIBUTING.md`](CONTRIBUTING.md).

## License

Coverage Web is licensed under the MIT License. You can [read the full license here](License) but the gist of it is this:

- You may __use this code for free__
- You may __use this code for commercial or non-commercial purposes__
- You are __not required to publish your changes to the code__
- __You do not hold the author or contributors liable for anything__
- __You *must give credit* to the original author in some form__. I prefer a [link to my personal website](http://billpatrianakos.me) but simply leaving my name in the license file will suffice

## Disclaimer

Coverage works by default by making requests to an external API to get quotes and subsidy data. In order to run quotes you must either build your own quoting API or sign up for [Q, the quoting API](https://q.aploquote.com/docs). The data used to generate quotes is available for download for free from [Data.Healthcare.gov](http://data.healthcare.gov) and the formula for estimating insurance subsidies is also freely available by doing a quick Google search. Coverage has been built from the ground up and does not use code from any other project besides the open source libraries it depends on. __Remember: all data output from this software is 100% free and public knowledge! If you can download the Healthcare.gov data sets then you can make your own insurance plan finder.__

__To get API credentials__ open up a new issue on this repository and I'll set you up with a set of credentials. Remember, this is only if you choose to use my [Q API](https://q.aplqouote.com/docs). You're free to [download the required data sets for free from the federal government](https://data.healthcare.gov) and run your own quoting API.

## A message from Bill

Please enjoy this open source helath insurnace quoting application. Please use it in your business, for your personal use, etc. Don't let the insurance companies and "quote engine/CRM" companies fuck you over. It's easy to run your own Obamacare/Affordable Care Act health insurance subsidy calculator and quote engine.

*Enjoy!*

- [Bill](http://billpatrianakos.me)
