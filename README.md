# testcafe-reporter-hipchat-reporter
[![Build Status](https://travis-ci.org/Igor9669/testcafe-reporter-hipchat-reporter.svg)](https://travis-ci.org/Igor9669/testcafe-reporter-hipchat-reporter)

This is the **hipchat-reporter** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

## Install

```
npm install testcafe-reporter-hipchat-reporter
```

## Usage

In order to use this TestCafe reporter plugin it is necessary to define .env variables in your test project, hence the folder from where your call TestCafe.

- cd into your test project.
- Edit or create the .env file by adding the following required variables:

```
AUTH_TOKEN=<HIPCHAT AUTHENTICATION TOKEN>
BASE_URL=https://<YOURS COMPANY NAME>.hipchat.com/v2/room
ROOM_ID=<ID OF THE HIPCHAT ROOM>
START_MESSAGE=<STARTING MESSAGE (OPTIONAL)>
```

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter hipchat-reporter
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('hipchat-reporter') // <-
    .run();
```

## Author
Igor Asyamov
