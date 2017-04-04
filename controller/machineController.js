angular.module('loggerApp', [])
.controller('MachineController', function($scope) {
ctrl.MachineController=$scope;

$scope.setOperators=function (optgridData){
  $scope.operators=optgridData;
  $scope.$apply();
};
$scope.setJobs=function (jobsData){
  $scope.jobs=jobsData;
  $scope.$apply();
};
$scope.jobChange=function (macid,seljob){

  var  url = "http://pi.trendzsoft.in/api/updatemachinestatus.php?" + "type='op'&tval='"+ seljob.id +"'&ip='" + macid + "'";
  $.getJSON(url, function( sdata ) {

  $('#loader1').hide();
  });
}
});
