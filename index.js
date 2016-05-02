var xboxdrvRunner = require('./xboxdrv-runner');
var sphero = require('sphero');
var myMath = require('./math');

// ----------------------------
var uuid = '<enter_droid_uuid_here>'; // Enter Droid UUID (MAC address)
// ----------------------------

var droid = sphero(uuid);

var maxSpeed = 40; // Ollie: <45;60>  BB8: <60:120>
var currentSpeed = 0;
var currentDirection = 0;

console.log('Connecting to:', uuid);
droid.connect(function() {
  droid.color('blue');
  console.log('Connected to droid');

  // Move relatively to current heading
  xboxdrvRunner.setLeftStickListener(function(position) {
    // console.log('leftStick:', position)
    var x = myMath.scale(-position.x); // Invert x to match droid movement direction
    var y = myMath.scale(position.y);
    var len = myMath.length(x, y);
    var direction = Math.round(myMath.angle(x, y));
    var speed = len * maxSpeed;

    if(speed > 0) {
      console.log('speed: ' + speed + ', direction: ' + direction);
      droid.roll(speed, direction);
      currentSpeed = speed;
      currentDirection = direction;

    } else {
      console.log('stopping');
      droid.roll(0, currentDirection, 0);
      currentSpeed = 0;
    }

    // console.log('leftStick:', position);
  });

  xboxdrvRunner.setRightStickListener(function(position) {
    // console.log('rightStick:', position)
  });

  xboxdrvRunner.setAButtonListener(function(down) {
    if(down) {
      console.log('a pressed');
      console.log('Updating relative heading by 90 degrees - press multiple times to adjust');

      // This is not optimal - param is apparently ignored
      droid.setHeading(0);
    }
  });

});
