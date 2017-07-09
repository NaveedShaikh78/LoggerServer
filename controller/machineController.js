loggerApp=angular.module('loggerApp', ['ngAnimate','ngTouch', 'ui.grid', 'ui.grid.grouping']);
loggerApp.controller('MachineController', function($scope) {
ctrl.MachineController=$scope;
$scope.selJob=[];
$scope.selOp=[];
$scope.selIdle=[];
for( port of appdata.ioports){
  $scope.selJob[port]=null;
  $scope.selOp[port]=null;
  $scope.selIdle[port]=null;
}
$scope.setJobs=function (jobsData){
  $scope.jobs=jobsData;
  $scope.$apply();
};
$scope.setOperators=function (optgridData){
  $scope.operators=optgridData;
  $scope.$apply();
};

$scope.setIdle=function (idleData){
  $scope.idles=idleData;
  $scope.$apply();
};
$scope.refresh=function(){
	$scope.$apply();
}

$scope.setSelJob=function (jobid,macid){
  for( job of   $scope.jobs){
    if(job.id==jobid){
      $scope.selJob[macid]=job;
      $scope.$apply();
    }
  }
};
$scope.setSelOp=function (opid,macid){
  for( operator of   $scope.operators){
    if(operator.id==opid){
      $scope.selOp[macid]=operator;
      $scope.$apply();
    }
  }
};

$scope.setSelIdle=function (idleid,macid){
  for( idle of   $scope.idles){
    if(idle.id==idleid){
      $scope.selIdle[macid]=idle;
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
};


$scope.opChange=function (macid,selop){
  $('#loader1').show();
  var  url = "http://trendzsoft.in/api/updatemachinestatus.php?" + "type=op&tval='"+ selop.id +"'&ip='" + macid + "'";
  $.getJSON(url, function( sdata ) {

  $('#loader1').hide();
  });
  return false;
};

$scope.idleChange=function (macid,selidle){
  $('#loader1').show();
  var  url = "http://trendzsoft.in/api/updatemachinestatus.php?" + "type=idle&tval='"+ selidle.id +"'&ip='" + macid + "'";
  $.getJSON(url, function( sdata ) {

  $('#loader1').hide();
  });
  return false;
};
});
