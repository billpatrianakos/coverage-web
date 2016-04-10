# Contributing

In order to contribute there are two rules:

1. Always create your own branch to work in. Your branch __must be__ cut from the `develop` branch.
2. Clean code is good code so follow the code style guide.

If you can follow those two rules then the process of contributing code looks like this:

1. Fork this project
2. Make your changes but __switch to the `develop` branch first!__
3. Go to your fork and press the green Pull Request button
4. Set up the request so that the changes you made in your fork will be merged into our `develop` branch

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
