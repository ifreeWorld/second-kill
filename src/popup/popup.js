$('#www').click(function() {
  console.log(111)
  sendMessageToContentScript(
    { cmd: "test", value: "你好，我是popup！" },
    function(response) {
      console.log("来自content的回复：" + response);
    }
  );
})

$('#button').click(function() {
  var val = $('#datetimepicker').val()
  if (val) {
    var time = new Date(val).getTime();
    sendMessageToContentScript(
      { time: time },
      function(response) {
        console.log("来自content的回复：" + response);
      }
    );
  }
})

$('#datetimepicker').datetimepicker();

function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(
    tabs
  ) {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      if (callback) callback(response);
    });
  });
}