# sphero-gamepad
Simple xbox controller bindings for sphero Droid

## Quick start
- `git clone https://github.com/Glogo/sphero-gamepad.git`
- `npm install`
- change droid uuid address in index.js
- `sudo npm start`
- (optional) `sudo killall xboxdrv` (if you are having problems conneting to gamepad)

## Prerequisites
- Linux & xboxdrv
- run `xboxdrv` in your command line to test gamepad and kill it before starting app
- Refer to [sphero](https://github.com/orbotix/sphero.js) and [noble](https://github.com/sandeepmistry/noble) for other sphero and bluetooth prerequisites

**Note:** This project is just quick proof of concept and is scheduled for refactoring
