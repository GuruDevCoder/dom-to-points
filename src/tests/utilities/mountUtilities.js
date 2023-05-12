const jsdom = require('jsdom')
const {JSDOM} = jsdom

const clearDOM = () => {
  const body = document.body
  while (body.firstChild) {
    body.removeChild(body.firstChild)
  }
}

const createGlobals = () => {
  const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
  const win = jsdom.window

  global.document = jsdom.window.document
  global.window = win

  // Object.keys(window).forEach(key => {
  //   if (!(key in global)) {
  //     global[key] = window[key]
  //   }
  // })
}

if (!global.document) createGlobals()

const mountDOM = htmlString => {
  if (!global.document) createGlobals()
  clearDOM()
  document.body.innerHTML = htmlString

  document.body.children.forEach(el => {})
}

const mountEls = (file, containerTopLeft = {top: 0, left: 0}) => {
  const els = require(`../integration/${file}`)

  const containerRect = {
    width: 900,
    height: 900,
    top: containerTopLeft.top,
    left: containerTopLeft.left
  }

  const {width, height, top, left} = containerRect

  const container = document.createElement('div')
  container.classList.add('container')
  Object.assign(container.style, {
    width: width + 'px',
    height: height + 'px',
    top: top + 'pt',
    left: left + 'pt'
  })
  container.getBoundingClientRect = () => ({
    width,
    height,
    top: top,
    left: left
  })
  document.body.appendChild(container)

  els.forEach(el => {
    container.appendChild(createMockSpan(el, containerRect))
  })
}

const createMockSpan = ({width, height, top, left, className}, container) => {
  const rect = {
    top: top + container.top,
    left: left + container.left
  }

  const span = document.createElement('span')
  Object.assign(span.style, {
    width: width + 'px',
    height: height + 'px',
    top: rect.top + 'pt',
    left: rect.left + 'pt'
  })
  span.classList.add(className)
  // we have to mock this for jsdom.
  span.getBoundingClientRect = () => ({
    width,
    height,
    top: rect.top,
    left: rect.left,
    right: width,
    bottom: height
  })
  return span
}

module.exports = {mountDOM, mountEls, createMockSpan, clearDOM}
