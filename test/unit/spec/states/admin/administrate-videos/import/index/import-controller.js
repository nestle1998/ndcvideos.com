'use strict';

describe('Controller(/admin/administrate-videos/import): ImportCtrl', function () {

  var ImportCtrl, scope;

  beforeEach(function () {

    module('ndc');

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      ImportCtrl = $controller('ImportCtrl', {
        $scope: scope
      });
    });
  });

});