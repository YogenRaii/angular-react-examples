'use strict';

describe('myApp.card module', function() {

  beforeEach(module('myApp.card'));

  describe('card controller', function(){

    it('should return name mastercard', inject(function($controller) {
      //spec body
      var cardCtrl = $controller('CardCtrl');
      expect(cardCtrl).toBeDefined();
    }));

  });
});