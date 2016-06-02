export class SendsayStyleRule {
	constructor(selector, cssAttributes) {
		this.selector = selector;
		this.ruleText = selector + ' { ' + this.makeRuleBody(cssAttributes) + ' } ';
	}

    makeRuleBody(rules) {
    	var result = '';
    	for(let key in rules) {
    		let rule = rules[key];
    		result += ' ' + key + ':' + rule + ';'
    	}
    	return result;
    }

    remove() {
    	if(!this.rawRule)
    		return;
    	let sheet = this.rawRule.parentStyleSheet;
    	let rules = sheet.rules,
    		ruleIndex;
    	for(ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
    		if(rules[ruleIndex] == this.rawRule) {
    			sheet.deleteRule(ruleIndex);
    			return;
    		}
    	}
    }
}