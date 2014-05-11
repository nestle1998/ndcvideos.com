'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('administrateVideosImportModal', stateFactory('ImportVideoModal', {
      url: '/import/{id}',
      resolve: {
        scrollLock: ['scrollLock', function (sl) {
          return sl;
        }]
      },
      views: {
        'modal@app': {
          templateUrl: 'states/admin/import-videos/import/index/modal.html',
          controller: 'ImportVideoModalCtrl'
        }
      },
      parent: 'importVideosOverview',
      onEnter: ['scrollLock', function (sl) {
        sl.enable();
      }],
      onExit: ['scrollLock', function (sl) {
        sl.disable();
      }]
    }));
  })
  .controller('ImportVideoModalCtrl', function ($scope, TagRepository, $state, vimeoAPI, $log, VideoRepository, _) {

    function errorHandler(code) {
      $state.go('error', {code: code});
    }

    $scope.tags = []; //This variable holds selected tags

    if (!$state.params.id)
      errorHandler(404);

    vimeoAPI
      .getVideoById($state.params.id).then(function (result) {
        $scope.vimeoVideo = result;
      })
      .catch(function (err) {
        $log.log(err);
        errorHandler(404);
      });

    $scope.select2Options = {
      multiple: true,
      createSearchChoice: function (term, data) {
        if (_.filter(data, function (item) {
          return item.text.localeCompare(term) === 0;
        }).length === 0) {
          return {id: '$$' + term, text: term};
        }
      },
      query: function (query) {
        TagRepository.search(query.term).then(function (data) {
          query.callback({results: data});
        });
      }
    };

    $scope.cancel = function () {
      if (!!confirm('Er du sikker på at du vil forkaste alle data?')) {
        $state.go('administrateVideos');
      }
    };

    $scope.publish = function (video) {

      if ($scope.tags.length > 0) {

        _.forEach($scope.tags, function (item) {

          if (item.id.substr(0, 1) == '$')
            delete item.id;
        });

        video.tags = $scope.tags;

        VideoRepository.create(video)
          .$save()
          .then(function (res) {
            $state.go('administrateVideos');
          })
          .catch(function (err) {
            $log.error(err);
            errorHandler();
          });
      }
    };
  });
