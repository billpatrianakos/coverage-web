# Contributing

In order to contribute there are two rules:

1. Always create your own branch to work in. __Your branch must be cut from the `develop` branch.__
2. Clean code is good code so __follow the code style guide__.

If you're a seasoned git/GitHub veteran then most of this will be familiar to you. These directions are very explicit because I want to encourage new GitHub users and new developers to contribute to this project.

## Submitting pull requests for new features and bug fixes

If you can follow the two rules we set above then the process of contributing code looks like the following.

### Forking and making edits

1. Fork the project and clone it to your local machine (`git clone https://github.com/__*YOUR_USERNAME*__/coverage-web.git`)
2. Add this repository as a remote (`git remote add upstream https://github.com/billpatrianakos/coverage-web.git`)
3. Checkout the `develop` branch by executing `git fetch && git checkout -b upstream/develop`
4. Now cut a branch off of `develop` and then do your work in there. (For example: `git checkout -b dev-myGithubUsername`)
5. You should make all of your changes in your own private branch (see step 4 above for an example of how to cut your own branch off of `develop`)

### Submitting the pull request

Once your work is ready to be merged into the main project you'll simply submit a pull request from `your-remote/dev-yourBranch` to `upstream/develop`. Here's how to do this:

1. Visit your repository on GitHub and press the green "New Pull Request" button
2. In the first dropdown select `Base:your-unique-branch` in the first box and `compare:develop` in the second box
3. From there just follow the on screen guide to make your pull request. Easy!

## Branching

We use a simple branching strategy:

- `master` is the latest stable version of the software (it's likely running online if it's on `master`)
- `develop` is where the cutting edge stuff goes. We all merge our individual branches into `develop` when we're finished
- `dev-YOUR_NAME` is your own copy of the project cut from the `develop` branch. When making pull requests you'll want to merge `origin/dev-<YOUR_USERNAME>` into `upstream/develop`

## Code Style

If your editor supports Editorconfig then you're 90% of the way to meeting this project's code standards. If you don't know what Editorconfig is or need a plugin to support it, check out [the official Editorconfig website](http://editorconfig.org). Check out [this project's `.editorconfig` file](.editorconfig) to see more.

### Spacing

1. Always use 2-space soft tabs (soft tabs are spaces)
2. When defining multiple variables at once in a list, line up your assignment operators
3. Allow for at least one new line between blocks of related code

More to come....
