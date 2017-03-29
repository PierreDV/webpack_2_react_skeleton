import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

// Set up testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = jquery(global.window);

// helper for rendering React components
function renderComponent(Component, props) {
  // use spread operator so props shows up as top level properties
  const componentInstance = TestUtils.renderIntoDocument(
    <div>
      <Component {...props} />
    </div>
  );
  //this line is what produces the HTML
  return $(ReactDOM.findDOMNode(componentInstance));
}

// Build helper for simulating events
$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
}

// chai-jquery setup
chaiJquery(chai, chai.util, $);

export { expect, renderComponent };
