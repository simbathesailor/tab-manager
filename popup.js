let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", function (data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute("value", data.color);
});

const maptabIdToobj = {};
function handleOnClick() {
  console.log("handleClickGot called", maptabIdToobj);
}

changeColor.onclick = function (element) {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log("changeColor.onclick -> chrome.tabs", tabs);

    tabs.forEach((elem) => {
      maptabIdToobj[elem.id] = elem;
    });

    // onclick='handleOnClick()'
    // function handleOnClick() {
    //   chrome.runtime.sendMessage({greeting: ${JSON.stringify(
    //     tabs[0]
    //   )}}, function(response) {
    //     console.log(response.farewell);
    //   });
    // }
    chrome.tabs.executeScript(tabs[0].id, {
      code: `
      function redirect(url) {
        console.log("redirect -> url", url)
        window.location.href= url
      }
        document.body.style.backgroundColor = "${color}";
         var domparser = new DOMParser();
         var doc = domparser.parseFromString("<div onclick='redirect('${tabs[0].url}')'>There you go boy ${tabs[0].title}</div>", "text/html")
         document.body = doc.body
      `,
    });
  });
};
