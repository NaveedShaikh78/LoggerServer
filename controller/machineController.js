angular.module('loggerApp', [])
.controller('MachineController', function($scope) {
ctrl.MachineController=$scope;
$scope.selJob=[];
$scope.selOp=[];
for( port of appdata.ioports){
  $scope.selJob[port]=null;
  $scope.selOp[port]=null;
}
$scope.setOperators=function (optgridData){
  $scope.operators=optgridData;
  $scope.$apply();
};
$scope.setJobs=function (jobsData){
  $scope.jobs=jobsData;
  $scope.$apply();
};
$scope.setSelJob=function (jobid,macid){
  for( job of   $scope.jobs){
    if(job.id==jobid){
      $scope.selJob[macid]=job;
      $scope.$apply();
  }
}
};
$scope.setSelOp=function (opid){
  for( operator of   $scope.operators){
    if(operator.id==opid){
      $scope.selOperator[macid]=operator;
      $scope.$apply();
   }
 }
};
$scope.jobChange=function (macid,seljob){
  $('#loader1').show();
  var  url = "http://trendzsoft.in/api/updatemachinestatus.php?" + "type=job&tval='"+ seljob.id +"'&ip='" + macid + "'";
  $.getJSON(url, function( sdata ) {

  $('#loader1').hide();
  });
  return false;
}
});
