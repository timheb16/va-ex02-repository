const fs = require("fs")
const PCA = require("pca-js")



/**
 *
 */
fs.readFile("../ex_01/Cleaned_Averages_2016.json", "utf8", (err, raw_data) => {
  if (err) {
    console.error(err)
    return
  }

  /**
   * Details of what the PCA functions are doing are explained here
   * https://www.npmjs.com/package/pca-js
   */

  let data = JSON.parse(raw_data)


  // TODO: 1. create matrix for pca calculation
  /**
   * For PCA the data needs to be transformed into a Matrix.
   * This can be done by nesting two array.
   * The inner array contains the measurements of each dimension of one data point.
   *
   * matrix = [
   *  [value1, value2, value3, value4, value5],
   *  [value1, value2, value3, value4, value5],
   *  [value1, value2, value3, value4, value5],
   * ...
   * ]
   */
   let matrix = []


   for (let i = 0; i < data.length; i++)
   {   
     let obj = data[i]
     let obj_array = [obj.avg_no2, obj.avg_o3, obj.avg_pm10, obj.avg_so2]
     matrix.push(obj_array)
   }
 
   //console.log(matrix)

  // TODO: 2. calculate Eigenvectors with PCA
  /**
   * PCA.getEigenVectors(matrix) returns the Eigenvectors and Eigenvalues by applying PCA on the matrix
   */
  let eigenvectors = PCA.getEigenVectors(matrix)
  //console.log(eigenvectors)

  // TODO: 3. calculate percentage explained of first 1, 2 and 3 Eigenvectors
  /**
   * PCA.computePercentageExplained(vectors, vectors[0]) calculates the percentage explained if the first vector
   *
   * PCA.computePercentageExplained(vectors, vectors[0], vectors[1]) calculates the percentage explained of the first two vectors
   *
   * and so on
   */

   let pct1 = PCA.computePercentageExplained(eigenvectors, eigenvectors[0])
   console.log(pct1)
   let pct2 = PCA.computePercentageExplained(eigenvectors, eigenvectors[0], eigenvectors[1])
   console.log(pct2)
   let pct3 = PCA.computePercentageExplained(eigenvectors, eigenvectors[0], eigenvectors[1], eigenvectors[2])
   console.log(pct3)


  // TODO: 4. save Eigenvectors to file
  /**
   * PCA.computeAdjustedData(matrix, vectors[0], vectors[1]) calculates the adjusted data according to the given principal components (vectors[0] and vectors[1])
   */

   let adjustedData = PCA.computeAdjustedData(matrix, eigenvectors[0], eigenvectors[1])

   console.log(adjustedData)

  
  fs.writeFile("eigenvectors.json", JSON.stringify(eigenvectors), (err) => {
    if (err) {
      console.error(err)
      return
    }
  })

  fs.writeFile("adjustedData.json", JSON.stringify(adjustedData), (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
  
})


