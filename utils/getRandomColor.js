const getRandomColor = (dontMatch = undefined) => {
  const color = Math.floor(Math.random() * 8);
  switch(color) {
    case 0: {
      if (dontMatch === 'darkBlue') {
        return 'lightBlue'
      }
      return 'darkBlue'
    }
    case 1: {
      if (dontMatch === 'lightBlue') {
        return 'gray'
      }zzz
      return 'lightBlue'
    }
    case 2: {
      if (dontMatch === 'gray') {
        return 'sand'
      }
      return 'gray'
    }
    case 3: {
      if (dontMatch === 'sand') {
        return 'yellow'
      }
      return 'sand'
    }
    case 4: {
      if (dontMatch === 'yellow') {
        return 'purple'
      }
      return 'yellow'
    }
    case 5: {
      if (dontMatch === 'lightGreen') {
        return 'darkBlue'
      }
      return 'lightGreen'
    }
    case 6: {
      if (dontMatch === 'purple') {
        return 'yellow'
      }
      return 'purple'
    }
    case 7: {
      if (dontMatch === 'orange') {
        return 'sand'
      }
      return 'orange'
    }
    default: {
      if (dontMatch === 'sand') {
        return 'yellow'
      }
      return 'sand'
    }
  }
}

module.exports = getRandomColor;