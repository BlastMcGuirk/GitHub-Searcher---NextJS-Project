I created a web application using the Next.js framework boostrapped with `create-next-app`.

## Prereqs

Make sure you have yarn installed at a minimum. Check out [this guide](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) to install it.

## Getting Started

Once you have pulled the code down to your computer, start by installing the node modules. This can be done with the command `yarn install` from the root directory of the project.

You can run this project in one of two ways.

### Developer Mode

To run the project in developer mode, use the command `yarn dev`. This will start the server on localhost on port 3000. Open a browser and navigate to `localhost:3000`. Here you will be able to view the page.

### Built Mode

To run the project from a fully build server, use the command `yarn build && yarn start`. This will build the project and immediately start it. Again, the page can be viewed at `localhost:3000` in a browser.

## Features

On the home page, you are able to search for a GitHub user. Once you enter a user, you can either press the enter button or press the search button. Then, the user's repos will appear. They are sorted by the number of stars. The page is also responsive, so as the screen shrinks, the cards will shrink to fit the screen. Clicking on a repo will bring you to the details page.

The details page for a repo lists more information about a repo than what was shown on the home screen. First, the repo name and user are both links to their respective GitHub pages. Lower in the page are three tabs showing different information about the repo. This page is also responsive, shrinking content to fit on the screen.

### Repo Info

The Repo Info tab shows more in depth information about the repo. On top of what was shown in the main page, this shows all of languages in the repo, along with a tooltip showing the number of lines in the repo. Additionally, there is a list of contributers for the repo with links to their GitHub profile pages.

### README

The README tab shows the repo's README if it has one. If the repo does not have one, or if the README just fails to load for any reason, a message will appear indicating that it failed to load. The HTML for the README was generated using the GitHub API call `(POST) /markdown`.

### Commits

The Commits tab shows the commits for the repo. These are also links to bring you directly to the GitHub page for the commit. The commit message, the committer name, and the commit date are all shown. These are also shown in order from newest to oldest.
