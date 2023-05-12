const {getBoxes} = require('./highlighter')

const goClockwise = (acc, box, i) => {
  const {
    top: topP,
    left: leftP,
    right: rightP = box.left + box.width,
    bottom: bottomP = box.top + box.height
  } = box

  const tLine = [[leftP, topP], [rightP, topP]]
  i === 0 && acc.push(...tLine)

  const rLine = [[rightP, topP], [rightP, bottomP]]
  acc.push(...rLine)

  return acc
}

const goAnticlock = (acc, box, i, arr) => {
  const prevBox = arr[i - 1] || {}
  const {prevBp = prevBox.top + prevBox.height} = prevBox
  const {top: topP, left: leftP, bottom: bottomP = topP + box.height} = box

  const leftLine = [[leftP, bottomP], [leftP, i > 0 ? prevBp : topP]]

  acc.push(...leftLine)

  return acc
}

const getPointsArray = query => {
  const boxes = getBoxes(query)
  const clockWiseCoords = boxes.reduce(goClockwise, [])
  const anticlockWiseCoords = boxes.reduceRight(goAnticlock, [])

  return clockWiseCoords.concat(anticlockWiseCoords)
}

const getBoxArray = query => getBoxes(query)

const getBoxArrayFrom = (query, parentEl) => {
  const boxes = getBoxArray(query)
  const parentPos = parentEl.getBoundingClientRect()

  return boxes.map(box => ({
    ...box,
    left: Math.floor(box.left - parentPos.left),
    top: Math.floor(box.top - parentPos.top)
  }))
}

const getPointsArrayFrom = (query, parentEl) => {
  const points = getPointsArray(query)
  const parentPos = parentEl.getBoundingClientRect()

  return points.map(pointGroup => [
    Math.floor(pointGroup[0] - parentPos.left),
    Math.floor(pointGroup[1] - parentPos.top)
  ])
}

const stringifier = fn => (...args) =>
  fn(...args)
    .map(point => point.join(','))
    .join(' ')

const getPolygonString = stringifier(getPointsArray)

const getPolygonStringFrom = stringifier(getPointsArrayFrom)

module.exports = {
  getBoxArray,
  getBoxArrayFrom,
  getPointsArray,
  getPointsArrayFrom,
  getPolygonString,
  getPolygonStringFrom
}
