'use strict';

describe('Model: FavoriteModel', function () {

  var FavoriteModel, $httpBackend, $rootScope, APIBaseUrl, FavoriteRepository, collectionUrl = 'favorites';

  beforeEach(function () {

    FavoriteRepository = jasmine.createSpy('FavoriteRepository');
    FavoriteRepository.attach = jasmine.createSpy('FavoriteRepository.attach');

    module('ndc', function ($provide) {
      $provide.value('FavoriteRepository', FavoriteRepository);
    });

    inject(function (_FavoriteModel_, _$httpBackend_, _$rootScope_, _APIBaseUrl_) {
      FavoriteModel = _FavoriteModel_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      APIBaseUrl = _APIBaseUrl_;
    });

  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have the url property set', function () {
    expect(FavoriteModel.$settings.url).toBe(APIBaseUrl + collectionUrl);
  });

  describe('$save', function () {
    it('should PUT its data on $save when it has an ID (update existing)', function () {
      $httpBackend.expectPUT(APIBaseUrl + collectionUrl + '/5', {title: 'New title', id: 5}).respond(200, {id: 5, title: 'New title from server'});
      var model = new FavoriteModel({title: 'New title', id: 5});

      var promise = model.$save();
      $httpBackend.flush();

      expect(model.title).toBe('New title from server');
      expect(typeof promise.then).toBe('function');
    });

    it('should POST its data on $save if does not have an ID (new)', function () {
      $httpBackend.expectPOST(APIBaseUrl + collectionUrl, {title: 'New title'}).respond(200, {id: 5, title: 'New title from server'});
      var model = new FavoriteModel({title: 'New title'});

      var promise = model.$save();
      $httpBackend.flush();

      expect(model.title).toBe('New title from server');
      expect(typeof promise.then).toBe('function');
    });

    it('should attach itself to the Repository on save', function () {
      $httpBackend.expectPUT(APIBaseUrl + collectionUrl + '/5', {title: 'New title', id: 5}).respond(200, {id: 5, title: 'New title from server'});
      var model = new FavoriteModel({title: 'New title', id: 5});
      expect(FavoriteRepository.attach).not.toHaveBeenCalled();
      var promise = model.$save();
      $httpBackend.flush();
      expect(FavoriteRepository.attach).toHaveBeenCalledWith(model);
    });
  });

  describe('$set', function () {
    it('should load instance and override with new data', function () {
      var model = new FavoriteModel({title: 'New title', id: 5});

      model.$set({id: 1});

      expect(model.id).toBe(1);
      expect(model instanceof FavoriteModel).toBeTruthy();
    });

    it('should remove properties missing in new object', function () {
      var model = new FavoriteModel();

      model.title = 'New title';
      model.id = 5;

      model.$set({id: 1});

      expect(model.id).toBe(1);
      expect(model.title).toBeUndefined();
    });
  });

  describe('$delete', function () {
    it('should delete on $delete', function () {
      $httpBackend.expectDELETE(APIBaseUrl + collectionUrl + '/5').respond(200, {});

      var model = new FavoriteModel();
      model.id = 5;

      var promise = model.$delete();
      $httpBackend.flush();

      expect(typeof promise.then).toBe('function');
    });
  });

});
