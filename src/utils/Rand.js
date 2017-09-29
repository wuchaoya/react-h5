/**
 * Created by chao on 2017/9/27.
 * 线性同余生成器
 */

const Rand = (() => {
  let seed = (new Date()).getTime();
  const r = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / (233280.0);
  };

  return (number) => {
    return Math.ceil(r() * number);
  };
})();

export default Rand;
Math.random().toString().splice(2, 3);
