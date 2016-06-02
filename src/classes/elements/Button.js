import {DOMObject} from "./DOMObject.js";


export class Button extends DOMObject {
	constructor(data, parent) {
		super(data, parent);
	}

	initialize() {
		this.template = '<div class = "[%classes%]" style="[%wrapperstyle%]">' +
							'<input type="button"  value="[%text%]"  style="[%style%]" />' + 
						'</div>';

		this.baseClass = 'sendsay-button';
		this.wrapperApplStyles = {
			'background-color': { param: 'backgroundColor' },
			'border-radius': { param: 'borderRadius', postfix: 'px' },
			'color': { param: 'textColor'},
			'line-height': { param: 'lineHeight' ,default: 'normal'},
			'width': { param: 'align', mapping: { justify: '100%' }}
		};
		this.applicableStyles = {
			'padding-bottom': { param: 'paddingBottom', postfix: 'px'},
			'padding-top': { param: 'paddingTop', postfix: 'px'},
			'padding-left': { param: 'paddingLeft', postfix: 'px'},
			'padding-right': { param: 'paddingRight', postfix: 'px'},
			'text-align': { param: 'align', mapping: { left: 'left', right: 'right', center: 'center' }}
		};		
	}

	addEvents() {
		if(this.el) {
			this.el.querySelector('input').addEventListener('click', this.handleClick.bind(this));
		}
	}

	handleClick() {
		this.trigger('sendsay-click');
	}

	removeEvents() {
		if(this.el) {
			this.el.querySelector('input').removeEventListener('click', this.handleClick.bind(this));
		}
	}

	makeStyles() {
		let styleObj = super.makeStyles(),
			data = this.data.appearance || {};
		if(data.align === 'justify')
			styleObj.width = '100%';
		return styleObj;
	}

	makeSettings() {
		let data = this.data.content || {},
			settings = super.makeSettings();
		settings.text = this.escapeHTML(data.text || 'Unknown');
		this.createInnerRule('input', this.wrapperApplStyles);
		return settings;
	}

	makeWrapperStyle() {
		let style = {},
			data = this.data.appearance || {};

		if(data.align !== 'justify')
			style['text-align'] = data.align;
		style = this.extend(style, this.applyStyles(this.wrapperApplStyles));
		return this.convertStyles(style)
	}

}