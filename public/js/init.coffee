"use strict"
angular.element(document).ready ->

  #Fixing facebook bug with redirect
  window.location.hash = "#!"  if window.location.hash is "#_=_"

  #Then init the app
  angular.bootstrap document, ["mean"]