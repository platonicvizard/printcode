/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
//var PicoModal = require('picoModal/picoModal');
var Jquery = require('jquery/dist/jquery');


var LoadingModule = React.createClass({

    componentDidMount: function(){
        var $ = Jquery;
    $('.progress').ajaxStart(function () {
        $(this).dialog({
            title: "Loading data...",
            modal: true,
            width: 50,
            height: 100,
            closeOnEscape: false,
            resizable: false,
            open: function () {
                $(".ui-dialog-titlebar-close", $(this).parent()).hide(); //hides the little 'x' button
            }
        });
    }).ajaxStop(function () {
        $(this).dialog('close');
    });
},
render() {
    return (
        <div className="progress" />
)}});

module.exports = LoadingModule;

/*
  var $ = Jquery;

    componentDidMount: function(){
        $('.progress').ajaxStart(function () {
        $(this).dialog({
            title: "Loading data...",
            modal: true,
            width: 50,
            height: 100,
            closeOnEscape: false,
            resizable: false,
            open: function () {
                $(".ui-dialog-titlebar-close", $(this).parent()).hide(); //hides the little 'x' button
            }
        });
    }).ajaxStop(function () {
        $(this).dialog('close');
    });
},
render() {
    return (
<div className="progress" />
<div class=" pico-content " role="dialog" style="padding: 20px; border-radius: 5px; left: 50%; top: 50px; width: auto; display: block; position: fixed; z-index: 10001; transform: translateX(-50%); background-color: white;">Please wait...</div>
    );
}
*/