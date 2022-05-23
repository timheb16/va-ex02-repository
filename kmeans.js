/* k-means implementation in 2D */

/**
 * Calculates the mean for x and y of the given data points.
 *
 * @param {[{ x, y, centroid_index }, ...]} datapoints - given data points to calculate measure on, whereas the array contains the data points; centroid_index is not needed here, but is part of the default data structure
 * @returns {{x, y}} - the measure (here: mean)
 */
function mean(datapoints) {
  let sumx = 0
  let sumy = 0
  for (let i = 0; i < datapoints.length; i++)
  {
    let obj = datapoints[i]
    sumx = sumx + obj.x
    sumy = sumy + obj.y
  }
  let xmean = sumx / datapoints.length
  let ymean = sumy / datapoints.length
  return { x: xmean, y: ymean }
}
/**
 * Calculates the median for x and y of the given data points.
 *
 * @param {[{ x, y, centroid_index }, ...]} datapoints - given data points to calculate measure on, whereas the array contains the data points; centroid_index is not needed here, but is part of the default data structure
 * @returns {{x, y}} - the measure (here: median)
 */
function median(datapoints) {
  let xvalues = []
  let yvalues = []
  for (let i = 0; i < datapoints.length; i++)
  {
    let obj = datapoints[i]
    xvalues.push(obj.x)
    yvalues.push(obj.y)
  }
  xvalues.sort(function(a, b){return b - a})
  yvalues.sort(function(a, b){return b - a})
  let xmed = 0
  let ymed = 0
  if (xvalues.length % 2 == 0)
  {
    let element1 = xvalues[Math.floor(xvalues.length / 2) - 1]
    let element2 = xvalues[Math.floor(xvalues.length / 2)]
    xmed = (element1 + element2) / 2.0
  }
  else
  {
    xmed = xvalues[Math.floor(xvalues.length / 2)]
  }
  if (yvalues.length % 2 == 0)
  {
    let element1 = yvalues[Math.floor(yvalues.length / 2) - 1]
    let element2 = yvalues[Math.floor(yvalues.length / 2)]
    ymed = (element1 + element2) / 2.0
  }
  else
  {
    ymed = yvalues[Math.floor(yvalues.length / 2)]
  }
  return { x: xmed, y: ymed }
}

/**
 * Calculates the euclidian distance between two points in space.
 *
 * @param {{ x, y, centroid_index }} point1 - first point in space
 * @param {{ x, y, centroid_index }} point2 - second point in space
 * @returns {Number} - the distance of point1 and point2
 */
function euclid(point1, point2) {
  let x1 = point1.x
  let x2 = point2.x
  let y1 = point1.y
  let y2 = point2.y
  var a = x1 - x2
  var b = y1 - y2
  var c = Math.sqrt(a*a + b*b) //pythagorean term
  return c
}

/**
 * Calculates the manhattan distance between two points in space.
 *
 * @param {{ x, y, centroid_index }} point1 - first point in space
 * @param {{ x, y, centroid_index }} point2 - second point in space
 * @returns {Number} - the distance of point1 and point2
 */
function manhattan(point1, point2) {
  let x1 = point1.x
  let x2 = point2.x
  let y1 = point1.y
  let y2 = point2.y
  let distance = Math.abs(x1-x2) + Math.abs(y1-y2)
  return distance
}

/**
 * Assigns each data point according to the given distance function to the nearest centroid.
 *
 * @param {[{ x, y, centroid_index }, ...]} datapoints - all available data points
 * @param {[{ x, y }, ... ]} centroids - current centroids
 * @param {Function} distance_function - calculates the distance between positions
 * @returns {[{ x, y, centroid_index }, ...]} - data points with new centroid-assignments
 */
function assign_datapoints_to_centroids(
  datapoints,
  centroids,
  distance_function
) {
  for (let i = 0; i < datapoints.length; i++)
  {
    let obj = datapoints[i]
    let min_dist = []
    for (let j = 0; j < centroids.length; j++)
    {
      if (j==0)
      {
        let dist = distance_function(obj, centroids[j])
        min_dist = [j, dist]
      }
      else
      {
        let dist = distance_function(obj, centroids[j])
        if (dist < min_dist[1])
        {
          min_dist = [j, dist]
        }
      }
    }
    obj.centroid_index = min_dist[0]
  }
  return datapoints
}

/**
 * Calculates for each centroid it's new position according to the given measure.
 *
 * @param {[{ x, y, centroid_index }, ...]} datapoints - all available data points
 * @param {[{ x, y }, ... ]} centroids - current centroids
 * @param {Function} measure_function - measure of data set (e.g. mean-function, median-function, ...)
 * @returns {{[{ x, y }, ... ], Boolean}} - centroids with new positions, and true of at least one centroid position changed
 */
function calculate_new_centroids(datapoints, centroids, measure_function) {
  let centroids_changed = false
  for (let i = 0; i < centroids.length; i++)
  {
    let centroid = centroids[i]
    let centroidarray = []
    for (let j = 0; j < datapoints.length; j++)
    {
      let obj = datapoints[j]
      if (obj.centroid_index == i)
      {
        centroidarray.push(obj)
      }
    }
    let means = measure_function(centroidarray)
    if (centroid.x != means.x)
    {
      centroids_changed = true
      centroid.x = means.x
    }
    if (centroid.y != means.y)
    {
      centroids_changed = true
      centroid.y = means.y
    }
  }
  return { centroids, centroids_changed }
}

/**
 * Generates random centroids according to the data point boundaries and the specified k.
 *
 * @param {[{ x, y }, ...]} datapoints - all available data points
 * @param {Number} k - number of centroids to be generated as a Number
 * @returns {[{ x, y }, ...]} - generated centroids
 */
function get_random_centroids(datapoints, k) {
  let centroids = []
  let minx = 0
  let miny = 0
  let maxx = 0
  let maxy = 0
  for (let i = 0; i < datapoints; i++)
  {
    let obj = datapoints[i]
    if (i == 0)
    {
      minx = obj.x
      miny = obj.y
      maxx = obj.x
      maxy = obj.y
    }
    else
    {
      if (minx > obj.x)
      {
        minx = obj.x
      }
      if (miny > obj.y)
      {
        miny = obj.y
      }
      if (maxx < obj.x)
      {
        maxx = obj.x
      }
      if (maxy < obj.y)
      {
        maxy = obj.y
      }
    }
  }
  for (let i = 0; i < k; i++)
  {
    let randomx = Math.random() * (maxx - minx) + minx
    let randomy = Math.random() * (maxy - miny) + miny
    let newcentroid = {x: randomx, y: randomy}
    centroids.push(newcentroid)
  }
  return centroids
}
