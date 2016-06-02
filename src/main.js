
import {Popup} from "./classes/elements/Popup.js";
import {Connector} from "./classes/Connector.js";
import {Form} from "./classes/Form.js";
(function() {

	
	var activatePopup  = function(url, options) {
		loadCss(function() {
			var connector = new Connector(url);
			var form = new Form(Popup, connector, options);
		});	
	};

	var showPopup = function(data, options) {
		//loadCss();
		let popup = new Popup(data);
		popup.activate(options);
	}

	var loadCss = function(callback) {
		var cssId = '_sendsay-styles';  // you could encode the css path itself to generate id..
		if (!document.getElementById(cssId))
		{
		    var head  = document.getElementsByTagName('head')[0];
		    var link  = document.createElement('link');
		    link.id   = cssId;
		    link.rel  = 'stylesheet';
		    link.type = 'text/css';
		    link.href = 'https://dl.dropbox.com/s/hq9cw3paj4tcube/sendsayforms.css';
		    link.media = 'all';
		    var sibling = document.querySelector('#sendsay-generated-sheet');
		    if(sibling) {
		    	document.head.insertBefore(link, sibling);
		    } else {
		    	document.head.appendChild(link);
		    }
		    link.addEventListener('load', callback);
		}
	} 
	window.SENDSAY = {
		activatePopup: activatePopup,
		showPopup: showPopup
	};
})();