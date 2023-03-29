const colors = {
    primary: '#DD5353',
    white: 'white',
    black: 'black'
}

const mode = (color) => {
    if (color === 'black') {
        this.colors.black = 'white';
        this.colors.white = 'black';
    }
    return this.colors.white
}

class Variables {
    constructor(color) {
      this.color = color;
      this.colors = {
        primary: '#DD5353',
        white: 'white',
        black: 'black'
      }
    }
  
    mode(color) {
      if (color === 'black') {
        this.colors.black = 'white';
        this.colors.white = '#2C3333';
      }
      return this.colors.white;
    }
  }
  

export { Variables, colors, mode }