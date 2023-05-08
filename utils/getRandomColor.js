const getRandomColor = () => {
  const color = Math.floor(Math.random() * 7);
  switch(color) {
    case 0: {
      return 'darkBlue'
    }
    case 1: {
      return 'lightBlue'
    }
    case 2: {
      return 'gray'
    }
    case 3: {
      return 'orange'
    }
    case 4: {
      return 'yellow'
    }
    case 5: {
      return 'lightGreen'
    }
    case 6: {
      return 'purple'
    }
    default: {
      return 'darkBlue'
    }
  }
}

module.exports = getRandomColor;