import {SendsayStyleRule} from "./SendsayStyleRule.js";

class SendsayStyleSheet {
	constructor() {
		let styleEl = document.createElement('style');
    	styleEl.type = 'text/css';
	  	styleEl.appendChild(document.createTextNode(''));
	  	debugger;
    	document.head.appendChild(styleEl);
    	styleEl.id = 'sendsay-generated-sheet';
    	this.idCounter = 0;

    	let sheets = document.styleSheets;
    	for(let i = 0; i < sheets.length; i++) {
    		if(sheets[i].ownerNode == styleEl) {
    			this.sheet = sheets[i];
    			break;
    		}
    	}
	}

	getFreeID() {
		return this.idCounter++;
	}

	addRule(selector, params, index) {
		index = index || 0;
		let rule = new SendsayStyleRule(selector, params);
		console.log(rule.ruleText);
		this.sheet.insertRule(rule.ruleText, index);
		rule.rawRule = this.sheet.rules[index];
		return rule;
	}
}



export const StyleSheet = new SendsayStyleSheet();
