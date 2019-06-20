$('#input').click(function() {
  console.log(222)
  var checked = $('#input')[0].checked;
  sendMessageToContentScript(
    { checked: checked },
    function(response) {
      console.log("来自content的回复：" + response);
    }
  );
})

function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(
    tabs
  ) {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      if (callback) callback(response);
    });
  });
}