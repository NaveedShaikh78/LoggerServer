loggerApp.controller('ReportController', function($scope,$compile) {
ctrl.ReportController=$scope;
ctrl.ReportController.compile=$compile;

$scope.setJobs=function (jobsData){
  $scope.jobs=jobsData;
  $scope.$apply();
};
$scope.setOperators=function (jobsData){
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
