/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var {Routes, Route} = require('react-router');

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;
// location="history"
React.renderComponent(
  <Routes>
    <Route name="app" path="/" handler={require('./layouts/Default.jsx')}>
      <Route name="home" path="/" handler={require('./pages/Home.jsx')} />
	  <Route name="files"  handler={require('./pages/Files.jsx')} />
      <Route name="privacy" handler={require('./pages/Privacy.jsx')} />
	  <Route name="terms"   handler={require('./pages/Terms.jsx')} />
	  <Route name="fileview"   handler={require('./pages/FileView.jsx')} />
	  <Route name="filelist"   handler={require('./pages/FileList.jsx')} />
	  <Route name="login" handler={require('./pages/CreateLogin.jsx')} />
	 
    </Route>
  </Routes>,
  document.body
);
