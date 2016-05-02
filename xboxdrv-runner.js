var spawn = require('child_process').spawn;
var xboxdrv = spawn('xboxdrv');
var controls = require('./config.json');
var regExp = /[A-za-z0-9]+:\s*([\d-]+)/g;

var leftStickListener = function() {};
var rightStickListener = function() {};
var aButtonListener = function() {};

var threshold = 7000;
var prevLeftStick;
var prevRightStick;
var prevAButtonDown = false;
var delay = 60; // ms between each event
var timer;

xboxdrv.stdout.on('data', function(data) {
  data = data.toString();

  var input = [];

  while((temp=regExp.exec(data)) !== null){
    input.push(temp[1]);
  }

  var leftStick = {
    x: input[controls['leftX'].pos],
    y: input[controls['leftY'].pos]
  }

  var rightStick =  {
    x: input[controls['rightX'].pos],
    y: input[controls['rightY'].pos]
  }

  var aButtonDown = input[controls['a'].pos] === "1";

  // Call listener if all valus are set
  if(typeof(leftStick.x)  !== 'undefined' && typeof(leftStick.y)  !== 'undefined' &&
     typeof(rightStick.x) !== 'undefined' && typeof(rightStick.y) !== 'undefined') {

    // Set dead zone to remove micro movements
    if(Math.abs(leftStick.x) < threshold) {
     leftStick.x = 0;
    }
    if(Math.abs(leftStick.y) < threshold) {
     leftStick.y = 0;
    }
    if(Math.abs(rightStick.x) < threshold) {
     rightStick.x = 0;
    }
    if(Math.abs(rightStick.y) < threshold) {
     rightStick.y = 0;
    }

    if(!timer) {
      timer = setTimeout(function() {
        timer = null;
      }, delay);

      // Continue with listeners

    } else {
      // Skip
      return;
    }

    // remove duplicate calls
    if(JSON.stringify(leftStick) !== JSON.stringify(prevLeftStick)) {
      leftStickListener(leftStick);
    }

    if(JSON.stringify(rightStick) !== JSON.stringify(prevRightStick)) {
      rightStickListener(rightStick);
    }

    if(aButtonDown !== prevAButtonDown) {
      aButtonListener(aButtonDown);
    }

    prevLeftStick = leftStick;
    prevRightStick = rightStick;
    prevAButtonDown = aButtonDown;
  }

  // console.log(data);
});

xboxdrv.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

xboxdrv.on('close', function (code) {
  console.log('xboxdrv process exited with code ' + code);
});

process.on('exit', function() {
  xboxdrv.kill();
});


module.exports = {
  setLeftStickListener: function(cb) {
    leftStickListener = cb;
  },
  setRightStickListener: function(cb) {
    rightStickListener = cb;
  },
  setAButtonListener: function(cb) {
    aButtonListener = cb;
  }
};
