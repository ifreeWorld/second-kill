$(document).ready(function() {
  injectCustomJs("src/lib/jquery-1.10.2.js");
  // injectCustomJs();
  var pageType = app.checkPage();
  var current = new Date().getTime();
  var time = localStorage.getItem('time')
  if (pageType === "shopping" && time && time < current) {
    app.shopping();
  } else if (pageType === "order") {
    app.order();
  }
  // 停止条件判断
  stop()
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.time) {
    localStorage.setItem('time', request.time)
    var current = new Date().getTime();
    setTimeout(() => {
      execute()
    }, request.time - current - 300);
  }
});

function execute() {
  setTimeout(() => {
    app.init();
  })
}

function stop() {
  var count = localStorage.getItem('count') || 0
  if (count < 6) {
    localStorage.setItem('count', +count + 1)
  } else {
    localStorage.removeItem('time')
    localStorage.removeItem('count')
  }
}

// 向页面注入JS
function injectCustomJs(jsPath) {
  jsPath = jsPath || "src/main/inject_qiuxuan.js";
  var temp = document.createElement("script");
  temp.setAttribute("type", "text/javascript");
  temp.src = chrome.extension.getURL(jsPath);
  document.body.appendChild(temp);
}

var app = {
  init: function() {
    // 判断是什么页面
    var pageType = this.checkPage();
    if (pageType === "shopping") {
      this.shopping();
    } else if (pageType === "order") {
      this.order();
    }
  },
  checkPage: function() {
    if ($("#J_Cart").length > 0) {
      return "shopping";
    } else if ($("#App").length > 0) {
      return "order";
    }
  },
  shopping: function() {
    var J_ItemBody = $("#J_OrderList").find(".J_ItemBody");
    var count = 0;
    $.each(J_ItemBody, function(index, item) {
      if (!$(item).hasClass("item-invalid")) {
        count++;
      }
    });
    if (count === 0 || $("#J_SelectAll1").hasClass("select-all-disabled")) {
      return;
    }
    $("#J_SelectAllCbx1").click();
    this.runAsync().then(app.shoppingSubmit);
  },
  shoppingSubmit: function(data) {
    $("#J_Go")[0].click();
    if ($("#J_SelectAll2").hasClass("select-all-disabled")) {
      return;
    }
  },
  runAsync: function() {
    var def = $.Deferred();
    //做一些异步操作
    setTimeout(function() {
      def.resolve("complete");
    }, 600);
    return def;
  },
  order: function() {
    if ($(".go-btn").length > 0) {
      $(".go-btn")[0].click();
    } else {
      // 回退
      location.href = document.referrer;
    }
  },
};