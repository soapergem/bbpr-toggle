# bbpr-toggle
Bitbucket Pull Request Toggle Buttons

This is a Chrome extension that adds a Toggle button to each file in Bitbucket's Pull Request view,
allowing you to quickly collapse and re-expand sections of the pull request for readability. This
also adds a button to quickly access Bitbucket's built-in "ignore whitespace" mode.

The reason the code is the way it is right now is because I'm lazy. You have to manually click a
button labeled "Activate Toggle" on each page load. The reason is because the file view is lazy-loaded
after the DOM has finished loading, and I didn't bother to try and hook into the events properly.
