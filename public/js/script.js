(function() {
  "use strict";
  angular.module("mean", ["ngCookies", "ngResource", "ngRoute", "ui.bootstrap", "ui.route", "mean.system", "mean.articles"]);

  angular.module("mean.system", []);

  angular.module("mean.articles", []);

}).call(this);

(function() {
  "use strict";
  angular.module("mean").config([
    "$routeProvider", function($routeProvider) {
      return $routeProvider.when("/articles", {
        templateUrl: "views/articles/list.html"
      }).when("/articles/create", {
        templateUrl: "views/articles/create.html"
      }).when("/articles/:articleId/edit", {
        templateUrl: "views/articles/edit.html"
      }).when("/articles/:articleId", {
        templateUrl: "views/articles/view.html"
      }).when("/", {
        templateUrl: "views/index.html"
      }).otherwise({
        redirectTo: "/"
      });
    }
  ]);

  angular.module("mean").config([
    "$locationProvider", function($locationProvider) {
      return $locationProvider.hashPrefix("!");
    }
  ]);

}).call(this);

(function() {
  'use strict';


}).call(this);

(function() {
  'use strict';


}).call(this);

(function() {
  "use strict";
  angular.element(document).ready(function() {
    if (window.location.hash === "#_=_") {
      window.location.hash = "#!";
    }
    return angular.bootstrap(document, ["mean"]);
  });

}).call(this);

(function() {
  "use strict";
  angular.module("mean.articles").controller("ArticlesController", [
    "$scope", "$routeParams", "$location", "Global", "Articles", function($scope, $routeParams, $location, Global, Articles) {
      $scope.global = Global;
      $scope.create = function() {
        var article;
        article = new Articles({
          title: this.title,
          content: this.content
        });
        article.$save(function(response) {
          return $location.path("articles/" + response._id);
        });
        this.title = "";
        return this.content = "";
      };
      $scope.remove = function(article) {
        var i, _results;
        if (article) {
          article.$remove();
          _results = [];
          for (i in $scope.articles) {
            if ($scope.articles[i] === article) {
              _results.push($scope.articles.splice(i, 1));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        } else {
          $scope.article.$remove();
          return $location.path("articles");
        }
      };
      $scope.update = function() {
        var article;
        article = $scope.article;
        if (!article.updated) {
          article.updated = [];
        }
        article.updated.push(new Date().getTime());
        return article.$update(function() {
          return $location.path("articles/" + article._id);
        });
      };
      $scope.find = function() {
        return Articles.query(function(articles) {
          return $scope.articles = articles;
        });
      };
      return $scope.findOne = function() {
        return Articles.get({
          articleId: $routeParams.articleId
        }, function(article) {
          return $scope.article = article;
        });
      };
    }
  ]);

}).call(this);

(function() {
  "use strict";
  angular.module("mean.system").controller("HeaderController", [
    "$scope", "Global", function($scope, Global) {
      $scope.global = Global;
      $scope.menu = [
        {
          title: "Articles",
          link: "articles"
        }, {
          title: "Create New Article",
          link: "articles/create"
        }
      ];
      return $scope.isCollapsed = false;
    }
  ]);

}).call(this);

(function() {
  "use strict";
  angular.module("mean.system").controller("IndexController", [
    "$scope", "Global", function($scope, Global) {
      return $scope.global = Global;
    }
  ]);

}).call(this);

(function() {
  "use strict";
  angular.module("mean.articles").factory("Articles", [
    "$resource", function($resource) {
      return $resource("articles/:articleId", {
        articleId: "@_id"
      }, {
        update: {
          method: "PUT"
        }
      });
    }
  ]);

}).call(this);

(function() {
  "use strict";
  angular.module("mean.system").factory("Global", [
    function() {
      var _this;
      _this = this;
      _this._data = {
        user: window.user,
        authenticated: !!window.user
      };
      return _this._data;
    }
  ]);

}).call(this);
