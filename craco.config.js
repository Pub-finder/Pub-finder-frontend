const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
};