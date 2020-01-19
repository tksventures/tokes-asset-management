export default {
  timeout(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  },

  chunkArray (arr, chunkSize) {
    let index = 0;
    const arrayLength = arr.length;
    const tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunkSize) {
      tempArray.push(arr.slice(index, index + chunkSize));
    }

    return tempArray;
  }
};
