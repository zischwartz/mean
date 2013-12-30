(function() {
  "use strict";
  angular.element(document).ready(function() {
    if (window.location.hash === "#_=_") {
      window.location.hash = "#!";
    }
    return angular.bootstrap(document, ["mean"]);
  });

}).call(this);
