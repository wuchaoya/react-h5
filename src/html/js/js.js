/**
 * Created by chao on 2017/12/12.
 */

function closeHtml () {
  console.log('点击了');
  if (navigator.userAgent.match(/iPad|iPhone/i)) {
    var url = window.location.href.split('?')[1];
    url = url.slice(3, url.length);
    window.location.href = url;
  }
  if (window.parent.postMessage) {
    window.parent.postMessage({ state:false }, '*');
  } else {
    if (window.postMessage) {
      window.postMessage();
    }
  }
};
