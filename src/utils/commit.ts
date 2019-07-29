import Cookies from 'js-cookie'
import {cookieExpires} from '@/config' // cookie保存的天数

/**
 * @Author: asheng
 * @msg: 存取token
 * @param {string} token
 */
export const TOKEN_KEY : string = 'token'
export const setToken = (token : string) => {
    Cookies.set(TOKEN_KEY, token, {
        expires: cookieExpires || 1
    })
}
export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) {
        return token
    } else {
        return false
    }
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = (url : string) => {
    const keyValueArr = url
        .split('?')[1]
        .split('&')
    let paramObj : any = {}
    keyValueArr.forEach(item => {
        const keyValue = item.split('=')
        paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj
}

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj : any, key : string | number) => {
    if (key) {
        return key in obj
    } else {
        const keysArr = Object.keys(obj)
        return keysArr.length
    }
}

export const forEach = (arr : any, fn : any) => {
    if (!arr.length || !fn) 
        return
    let i = -1
    let len = arr.length
    while (++i < len) {
        let item = arr[i]
        fn(item, i, arr)
    }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1 : any, arr2 : any) => {
    let len = Math.min(arr1.length, arr2.length)
    let i = -1
    let res = []
    while (++i < len) {
        const item = arr2[i]
        if (arr1.indexOf(item) > -1) 
            res.push(item)
    }
    return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1 : any, arr2 : any) => {
    return Array.from(new Set([
        ...arr1,
        ...arr2
    ]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr : any, arr : any) => {
    return targetarr.some((value : any) => arr.indexOf(value) > -1);
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value : number | string, validList : any) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = (timeStamp : any) => {
    const timeStr = String(timeStamp)
    return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp : any, currentTime : any) => {
    return timeStamp < currentTime;
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = (num : number) => {
    return num < 10
        ? '0' + num
        : num;
}
/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
    const ua = window.navigator.userAgent;
    const isExplorer = (exp : any) => {
        return ua.indexOf(exp) > -1;
    }
    if (isExplorer('MSIE')) {
        return 'IE';
    } else if (isExplorer('Firefox')) {
        return 'Firefox';
    } else if (isExplorer('Chrome')) {
        return 'Chrome';
    } else if (isExplorer('Opera')) {
        return 'Opera';
    } else if (isExplorer('Safari')) {
        return 'Safari';
    }
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1 : any, obj2 : any) => {
    const keysArr1 = Object.keys(obj1);
    const keysArr2 = Object.keys(obj2);
    if (keysArr1.length !== keysArr2.length) {
        return false;
    } else if (keysArr1.length === 0 && keysArr2.length === 0) {
        return true;
    } else {
        return !keysArr1.some(key => obj1[key] !== obj2[key]);
    }
}

/**
 * @msg: 获取系统当前时间
 * @param {string} fmt 时间格式 具体看代码
 * @return: string
 */
export const getDate = (fmt : any) => {
    let time = ''
    const date = new Date()
    const o : any = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "H+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        time = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            time = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
                ? (o[k])
                : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }
    return time
}

/**
 * @msg: 获取系统当前时间
 * @param {string} date 时间
 * @param {string} fmt 时间格式
 * @return: string
 */
export const formatDate = (date : any, fmt : string) => {
    let time = ''
    const o : any = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "H+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        time = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            time = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
                ? (o[k])
                : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }
    return time
}

// copy in the 'fx-fuli' utils
/**
 * 校验手机号是否正确
 * @param phone 手机号
 */

export const verifyPhone = (phone : string | number) => {
    const reg = /^1[34578][0-9]{9}$/
    const _phone = phone
        .toString()
        .trim()
    let toastStr = _phone === ''
        ? '手机号不能为空~'
        : !reg.test(_phone) && '请输入正确手机号~'
    return {
        errMsg: toastStr,
        done: !toastStr,
        value: _phone
    }
}

export const verifyStr = (str : string | number, text : string) => {
    const _str = str
        .toString()
        .trim()
    const toastStr = _str.length
        ? false
        : `请填写${text}～`
    return {
        errMsg: toastStr,
        done: !toastStr,
        value: _str
    }
}

// 截取字符串
export const sliceStr = (str : any, sliceLen : number) => {
    if (!str) {
        return ''
    }
    let realLength = 0
    const len = str.length
    let charCode = -1
    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1
        } else {
            realLength += 2
        }
        if (realLength > sliceLen) {
            return `${str.slice(0, i)}...`
        }
    }

    return str
}

/**
 * JSON 克隆
 * @param {Object | Json} jsonObj json对象
 * @return {Object | Json} 新的json对象
 */
export function objClone(jsonObj : any) {
    let buf : any
    if (jsonObj instanceof Array) {
        buf = []
        let i = jsonObj.length
        while (i--) {
            buf[i] = objClone(jsonObj[i])
        }
        return buf
    } else if (jsonObj instanceof Object) {
        buf = {}
        for (let k in jsonObj) {
            buf[k] = objClone(jsonObj[k])
        }
        return buf
    } else {
        return jsonObj
    }
}