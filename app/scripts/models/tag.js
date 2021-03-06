'use strict';

angular.module('ndc')
    .factory('TagModel', function ($q, $http, $rootScope, BaseModel, APIBaseUrl, $injector) {

        var url = APIBaseUrl + 'tags';

        function Model(data) {
            data = data || {};
            data.url = url;
            BaseModel.call(this,data);
        }

        Model.$settings = {url:url};
        Model.prototype = Object.create(BaseModel.prototype);

        //Decorate save to attach this item to the Repository on successful save
        var _$save = Model.prototype.$save;
        Model.prototype.$save = function () {
            var self = this;
            return _$save.apply(this, arguments).then(function (response) {
                var Repository = $injector.get('TagRepository');
                Repository.attach(self);
                return response;
            });
        };

        return Model;
    });