'use strict';

var AmpersandView = require('ampersand-view');
var template = require('./templates/one-way-price.hbs');

var View = AmpersandView.extend({
  template: template,
  bindings: {
    'model.direction': '[data-hook=direction]',
    'model.bigFigures': '[data-hook=bigFigures]',
    'model.pips': '[data-hook=pips]',
    'model.tenthOfPips': '[data-hook=tenthOfPips]'
  },
  events: {
  	'click [data-hook=execute]': 'execute' 
  },

  initialize: function(){
    this.model.on('change', this.render, this);
  },  

  execute: function(){
  	console.log(this.model);
  }
});

module.exports = View;
