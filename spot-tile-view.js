'use strict';

var AmpersandView = require('ampersand-view');
var template = require('./templates/spot-tile-view-template.hbs');
var OneWayPriceView = require('./one-way-price-view');
var simulator = require('simulator');

var View = AmpersandView.extend({	
	template: template,	
	bindings: {
		'model.tileState': {
			type: 'toggle',
			hook: 'state'
		},
		'model.symbol': {
			hook: 'symbol'
		},
		'model.isExecuting': {
			type: 'toggle',
			hook: 'isExecuting'
		},
		'model.stale': {
			type: 'toggle',
			hook: 'stale'			
		},
		'model.notStale': {
			type: 'toggle',
			hook: 'notStale'			
		},
		'model.upMovement': {
			type: 'toggle',
			hook: 'up-movement'
		},
		'model.downMovement': {
			type: 'toggle',
			hook: 'down-movement'
		},
		'model.spread': {
			hook: 'spread'
		},
		'model.dealtCurrency': {
			hook: 'dealtCurrency'
		},
		'model.notional': {
			type: 'value',
			hook: 'notional'
		},
		'model.spotDate': {
			hook: 'spotDate'
		}
	},

	subviews: {
		bid: {
			container: '[data-hook=one-way-price-bid]',
			waitFor: 'model.bidPriceModel',
			prepareView: function(el){
				return new OneWayPriceView({
					el: el,
					model: this.model.bidPriceModel
				});
			}
		},

		ask: {
			container: '[data-hook=one-way-price-ask]',
			waitFor: 'model.askPriceModel',
			prepareView: function(el){
				return new OneWayPriceView({
					el: el,
					model: this.model.askPriceModel
				});
			}
		}
	},

	initialize: function(){
		var self = this;
		simulator.prices(this.model.ccyPair).subscribe(function(price) {

			self.model.price.set({
				bid: price.bid.rate,
				ask: price.ask.rate,
				ccyPair: price.ccyPair,				
				valueDate: price.valueDate,
				spread: price.spread,
				mid: price.mid
			});

			self.model.trigger('change:price', self.model);

			self.model.askPriceModel.set({
				direction: self.model.direction,
				ccyPair: price.ccyPair,	
				rate: price.ask.rate
			});

			self.model.bidPriceModel.set({
				direction: self.model.direction,
				ccyPair: price.ccyPair,	
				rate: price.bid.rate
			});
	  });
	}
});

module.exports = View;