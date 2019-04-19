import {isString, isUndefined, isJQueryObject} from '../utils/types'
import {showHide} from './helpers'

export const createText = (text) => document.createTextNode(text)

export const getText = (node) => {
  if (isUndefined(node.textContent)) {
    return node.innerText.trim()
  }
  return node.textContent.trim()
}

export const createElem = (...args) => {
  const tag = args[0]
  if (!isString(tag)) {
    return null
  }

  const el = document.createElement(tag)
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    if (Array.isArray(arg) && arg.length === 2) {
      el.setAttribute(arg[0], arg[1])
    }
  }
  return el
}

export const removeElem = (node) => node.parentNode.removeChild(node)

export const hasClass = (ele, cls) => {
  if (isUndefined(ele)) {
    return false
  }

  return ele.classList.contains(cls)
}

export const addClass = (ele, cls) => {
  if (isJQueryObject(ele)) {
    ele = ele[0]
  }
  ele.classList.add(cls)
}

export const removeClass = (ele, cls) => {
  if (isJQueryObject(ele)) {
    ele = ele[0]
  }
  ele.classList.remove(cls)
}

export const toggleClass = (ele, cls) => {
  if (isJQueryObject(ele)) {
    ele = ele[0]
  }
  ele.classList.toggle(cls)
}

export const createOpt = (text, value, isSel) => {
  const isSelected = isSel ? true : false
  const _value = '' + value
  const opt = isSelected ?
    createElem('option', ['value', _value.trim()], ['selected', 'true']) :
    createElem('option', ['value', _value.trim()])
  opt.appendChild(createText(text.trim()))
  return opt
}

export const is = (ele, tag) => {
  tag = tag.toLowerCase()
  if (isJQueryObject(ele)) {
    ele = ele[0]
  }

  if (tag === ':focus') {
    return ele === document.activeElement
  }

  if (tag === ':checkbox') {
    return ele.type === 'checkbox'
  }

  if (tag === ':radio') {
    return ele.type === 'radio'
  }

  if (tag === 'input[type=text]') {
    return ele.type === 'text' && ele.nodeName.toLowerCase() === 'input'
  }

  return ele.nodeName.toLowerCase() === tag
}

export const find = (ele, selector) => {
  if (isJQueryObject(ele)) {
    ele = ele[0]
  }

  return ele.querySelectorAll(selector)
}

export const show = (elements) => showHide(elements, true)

export const hide = (elements) => showHide(elements)