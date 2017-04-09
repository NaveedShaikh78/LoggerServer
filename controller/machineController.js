angular.module('loggerApp', [])
.controller('MachineController', function($scope) {
ctrl.MachineController=$scope;
$scope.jobs=[];
$scope.operators=[];
$scope.setOperators=function (optgridData){
  $scope.operators=optgridData;
  $scope.$apply();
};

$scope.setJobs=function (jobsData){
  $scope.jobs=jobsData;
  $scope.$apply();
};
$scope.setSelJob=function (jobid){
  for(var job in   $scope.jobs){
    if(job.jobid==jobid){
  }
}
};
$scope.setSelOp=function (jobid){
  for(var op in   $scope.operators){
    if(op.opid==opid){
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
