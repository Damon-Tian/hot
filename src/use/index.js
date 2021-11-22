import { toRefs } from "vue";
import { useLoadingStore } from "../store/index.js";
const { backImg, setBackImg } = toRefs(useLoadingStore());

export function setBackImage(type) {
  setBackImg.value(type);
}

/**
 *
 * @param {*} index 当前展示index  -0
 * @param {*} data 传入数据以便展示 -firstData
 * @param {*} result 最后展示结果 -data.value
 * @param {*} timeout loading展示时间
 * @param {*} code 是否需要loading等其他自定义code
 * @returns
 */
export function displayData(index, data, result, code, timeout = 200) {
  let arr = [];
  data instanceof Array ? (arr = data) : (arr = data.data);
  if (index >= arr.length) {
    code && code();
    return;
  }
  result.push(arr[index]);
  index = index + 1;
  setTimeout(() => {
    displayData(index, data, result, code, timeout);
  }, timeout);
}
