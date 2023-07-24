window.addEventListener('load', function() {
    if (navigator.serviceWorker != null) {
        navigator.serviceWorker.register('/sw.js?_=' + Date.now())
          .then(function (registration) {
            console.log('serviceWorker注册成功');
            //
          }).catch(function(e) {
            console.log('serviceWorker注册失败');
          })
    }
    const installbBox = document.querySelector(".pwa-Install-box");
    const addBtn = document.querySelector(".pwa-add-button");
    installbBox.style.display = "none";

    window.addEventListener("beforeinstallprompt", (e) => {
      // 防止 Chrome 67 及更早版本自动显示安装提示
      e.preventDefault();
      // 稍后再触发此事件
      deferredPrompt = e;
      // 更新 UI 以提醒用户可以将 App 安装到桌面
      installbBox.style.display = "block";

      addBtn.addEventListener("click", (e) => {
        // 隐藏显示 A2HS 按钮的界面
        installbBox.style.display = "none";
        // 显示安装提示
        deferredPrompt.prompt();
        // 等待用户反馈
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
          } else {
            console.log("User dismissed the A2HS prompt");
          }
          deferredPrompt = null;
        });
      });
    });
});

// if(Notification.permission === 'default') {
//     Notification.requestPermission()
// }

// if(!navigator.onLine) { //是否有网络
//     new Notification('提示', { body: '当前处于断网环境，访问的是应用缓存' });
// }

// window.addEventListener('offline', function() {
//     // 断网情况下
//     new Notification('提示', { body: '当前处于断网环境，访问的是应用缓存' });
// });

window.addEventListener('online', function() {
    // 网络重新链接时，刷新页面
    window.location.reload();
})

setInterval(function(){
  console.log('定时拉活')
}, 1000 * 5)