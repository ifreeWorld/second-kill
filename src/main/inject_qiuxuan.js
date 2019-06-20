setTimeout(function() {
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
      // else if ($('#App').find('#confirmOrder_1').length > 0 && $('.go-btn').length > 0) {
      //     return 'order';
      // }
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
        // setTimeout
        // location.reload();
        return;
      }
      $("#J_SelectAllCbx1").click();
      this.runAsync().then(app.shoppingSubmit);
    },
    shoppingSubmit: function(data) {
      var date2 = new Date().getTime();
      var date1 = $("#date1").data("time");
      console.log((date2 - date1) / 1000);
      $("#J_Go")[0].click();
      clearInterval(timer)
      if ($("#J_SelectAll2").hasClass("select-all-disabled")) {
        // setTimeout
        // location.reload();
        return;
      }
    },
    runAsync: function() {
      var def = $.Deferred();
      //做一些异步操作
      setTimeout(function() {
        def.resolve("complete");
      }, 1000);
      return def;
    },
    order: function() {
      if ($(".go-btn").length > 0) {
        $(".go-btn")[0].click();
        clearInterval(timer)
      } else {
        location.href = document.referrer;
      }
    },
  };
  var timer = setInterval(() => {
    app.init();
  })
}, 100);
