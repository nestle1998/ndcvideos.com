'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('favourites', stateFactory('Favourites', {
            url:'/favourites',
            templateUrl: 'pages/favourites/index/main-view.html'
        }));
    })
    .controller('FavouritesCtrl', function ($scope, $log, CurrentUser) {

        console.log(CurrentUser.get());
        $scope.favourites = CurrentUser.get().favourites;

    });