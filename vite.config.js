const path = require('path');

export default {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Adaptable'
    },
  }
}