var inputMax = 32767;
var targetMax = 1;

module.exports = {

  // Scale input value in interval <-inputMax; inputMax> to <-targetMax; targetMax>
  scale: function(input) {
    return targetMax * input / inputMax;
  },

  // Calculate distance (used as speed) using pytharogas theorem
  length: function(x, y) {
    return Math.sqrt(x*x + y*y);
  },

  // Calculate angle (used as direction) using atan2 in degrees mapped to <0; 359>
  angle: function(x, y) {
    var rad = Math.atan2(y, x);
    var deg = rad * (180 / Math.PI);

    if(deg < 0) {
      deg = 360 + deg;
    }

    return deg;
  }
};
