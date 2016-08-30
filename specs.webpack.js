/* eslint no-undef: "error" */
/* global describe it expect */

let context = require.context('./specs', true, /_spec\.js$/);
context.keys().forEach(context);
