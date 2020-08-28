// First event

// If you define default_popup in manifest, you cannot use chrome.browserAction.onClicked.addListener method,
// it will throw error
// chrome.browserAction.onClicked.addListener(buttonClicked);

// function buttonClicked() {
//   console.log("button is clicked in buttonclicked handler");
// }

// You can send the message from all the tab or unique tab using

// let msg: {
//   txt: "hello"
// }

// chrome.tabs.sendMessage(tab.id, msg)

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: "#3aa757" }, function () {
    console.log("The color is green.");
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "developer.chrome.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });

  chrome.runtime.onMessage.addListener(function (message, sender, callback) {
    console.log("sender", sender);
    console.log("message", message);

    if (message.type === "trigger_redirection_tosuspended_page") {
      // I need to create the redirection link for the
      const { tab } = sender;
      chrome.tabs.update(tab.id, {
        url: chrome.runtime.getURL(
          `pages/suspendedpage.html?url=${tab.url}&title=${tab.title}`
        ),
      });
    }
    if (message == "reload") {
      chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="orange"',
      });
    }
  });

  // chrome.runtime.onInstalled.addListener(function () {
  //   chrome.contextMenus.create({
  //     id: "sampleContextMenu",
  //     title: "Sample Context Menu",
  //     contexts: ["selection"],
  //   });
  // });

  chrome.contextMenus.create({
    id: "sampleContextMenu",
    title: "Sample Context Menu",
    contexts: ["selection"], // only show context menu on selection
  });

  // You can have more options to add the context menus. check the documentation  for
  // chrome.contextMenus

  chrome.contextMenus.onClicked.addListener(() => {
    console.log("context menu clicked");
  });

  // This will run when a bookmark is created. need permission
  // chrome.bookmarks.onCreated.addListener(function () {
  //   // do something
  // });
});

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(
//     sender.tab
//       ? "from a content script:" + sender.tab.url
//       : "from the extension"
//   );
//   if (request.greeting == "hello") sendResponse({ farewell: "goodbye" });
// });

// Do not register listeners asynchronously
