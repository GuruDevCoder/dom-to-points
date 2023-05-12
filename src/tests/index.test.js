const {mountEls, clearDOM} = require('./utilities/mountUtilities')
const {
  getPointsArray,
  getPointsArrayFrom,
  getPolygonString,
  getPolygonStringFrom
} = require('../index')

const testPoints = [
  [0, 0],
  [300, 0],
  [300, 0],
  [300, 100],
  [200, 101],
  [200, 201],
  [200, 202],
  [200, 302],
  [300, 303],
  [300, 403],
  [0, 403],
  [0, 302],
  [0, 302],
  [0, 201],
  [0, 201],
  [0, 100],
  [0, 100],
  [0, 0]
]

const testPolygonString =
  '0,0 300,0 300,0 300,100 200,101 200,201 200,202 200,302 300,303 300,403 0,403 0,302 0,302 0,201 0,201 0,100 0,100 0,0'

describe('index', () => {
  beforeEach(clearDOM)

  describe('getPointsArray: get the final shape points, array format', () => {
    it('should return a shape passing a query string', () => {
      mountEls('manyboxes')

      const points = getPointsArray('.item')

      // console.log('points', points)

      expect(points).toEqual(testPoints)
    })

    it('should return a shape passing elements', () => {
      mountEls('manyboxes')

      const points = getPointsArray([...document.querySelectorAll('.item')])

      // console.log('points', points)

      expect(points).toEqual(testPoints)
    })

    it('should return a shape passing elements and get relative measures', () => {
      mountEls('manyboxes', {top: 40, left: 40})

      const points = getPointsArrayFrom(
        [...document.querySelectorAll('.item')],
        document.querySelector('.container')
      )

      expect(points).toEqual(testPoints)
    })
  })

  describe('getPolygonString: get the final shape points, polygon string', () => {
    it('should return a shape passing a query string', () => {
      mountEls('manyboxes')

      const points = getPolygonString('.item')

      // console.log('polygonString', points)

      expect(points).toEqual(testPolygonString)
    })

    it('should return a shape passing elements', () => {
      mountEls('manyboxes')

      const points = getPolygonString([...document.querySelectorAll('.item')])

      expect(points).toEqual(testPolygonString)
    })

    it('should return a shape passing elements and get relative measures', () => {
      mountEls('manyboxes', {top: 40, left: 40})

      const points = getPolygonStringFrom(
        [...document.querySelectorAll('.item')],
        document.querySelector('.container')
      )

      expect(points).toEqual(testPolygonString)
    })
  })
})
