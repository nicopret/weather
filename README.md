A mobile weather app, tested on Android and is working.

You must have Nativescript and Angular installed on your machine. Depending on your target device, you must have either Android Studio or XCode installed, or both.

Register on `https://openweathermap.org/` and get an api key.

To install, run `npm install` and then upate the `src/app/api/config.ts` file with your api key. Add the key to `static API_KEY` as follows:

`static API_KEY = 'appid=XXXX';` where XXXX is the api key.

At this stage the nativescript preview is not working, there seems to be a bug with angular 10 & nativescript 7 that stops it from working, so you will have to install the emulators on your system. To run it, either use `npm run android` or `npm run ios`, depending on your emulator.

The images is not loading, I'm working on it :)
