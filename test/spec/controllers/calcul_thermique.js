'use strict';

describe('Controller: CalculThermiqueCtrl', function () {

  // load the controller's module
  beforeEach(module('echangeurApp'));

  var CalculThermiqueCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CalculThermiqueCtrl = $controller('CalculThermiqueCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CalculThermiqueCtrl.awesomeThings.length).toBe(3);
  });
});
