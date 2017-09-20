
react  + react-router + webpack + ES6/7 + fetch + styledComponents + flex + eslint

## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 建议高版本 我使用的
>  node -v v8.1.2
> npm -v 5.0.4
> yarn -v 0.27.5
> 由于新版本的npm不太稳定，就用了yarn做下载工具，用起来还不错
```

git clone https://github.com/wuchaoya/react-web.git  

cd react-web

npm install 或者 yarn

npm start 或者 yarn start

npm run build 或者 yarn run build

```
### 其他

在游戏详情 游戏图片滑动时候 chrome 监听touch类事件报错

```
Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/...
```
event.cancelable 浏览器默认行为是否可以被禁用
event.defaultPrevented 浏览器默认行为是否已经被禁用
好像mdn上的event.preventDefault()方法还没更新到最新

修改了   react-dom/lib/SyntheticEvent.js  113行左右

``` js
if (event.preventDefault) {
      if (event.cancelable) {
        // 判断默认行为是否已经被禁用
        if (!event.defaultPrevented) {
          event.preventDefault();
        }
      }
}
```