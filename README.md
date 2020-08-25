# Tab Manager

<h2  align="center">Tab manager in progress </h2>

### Links

Fast forward it.

1. Tab manager to suspend tabs, all tabs or filte tabs
2. Tagging the tab and easy search
3. Showing the usage stats for the user
4. shortcuts like
5. Hide other tabs which are open

Research about how to make devtools:

command + tab
jumping across tabs

https://developer.chrome.com/extensions/manifest

https://developer.chrome.com/extensions/getstarted

https://developer.chrome.com/extensions/single_purpose

## High level overview

1. There can be options page.
2. Options pages can be debugged using background.js file. This background.js file need to be configured in manifest.json
3. There can be something like on click of extension icon beside chrome url header. It can pe popup like when you click on reactjs extension on top. The UI for this is kept in popup.html.
4. default_icon field in top can

Learn

Content scripts run on matched url and has acccess to documents, its debug in in devtool console on the page

Example:

<!-- "content_scripts": [
    {
      "matches": ["https://developer.chrome.com/*"],
      "js": ["pages/suspendedpage.js"]
    }
  ] -->

It will run on all the pages which matches the matches

background script runs when the browser isopen and wait for events from the content scripts is something. It has the debug somewhere else. CLick on inspect view in extensions

A pop always a new when you open. Popup can be deeugged by right clicking on pop up

background => scope A
content-scripts => scope B // this only kow about content on the page
popup => scope C // cannot know any thing in the content automatically

In pop you can get tabs

chrome.tabs.getCurrent(callback) ❌,
funtion callback(tab) {

}

In pop you can get tabs
chrome.tabs.query({active: true, currentWindow: true}, callback) ✅,
funtion callback(tabs) {
tabs
}

From popup also you can send message to content scripts

using same

chrome.tabs.sendMessage(tabId, msg) // msg is anything serializable

https://developer.chrome.com/extensions/override

Video Link:

https://www.youtube.com/watch?v=YQnRSa8MGwM
