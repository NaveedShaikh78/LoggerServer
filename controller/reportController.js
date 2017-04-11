loggerApp.controller('ReportController', function($scope) {
ctrl.ReportController=$scope;

$scope.setJobs=function (jobsData){
  $scope.jobs=jobsData;
  $scope.$apply();
};


$scope.jobChange=function (jobid){
  $('#loader1').show();
  var  url = "http://trendzsoft.in/api/updatemachinestatus.php?" + "type=job&tval='"+ seljob.id +"'&ip='" + macid + "'";
  $.getJSON(url, function( sdata ) {

  $('#loader1').hide();
  });
  return false;
}
});
