appdata.reportController = loggerApp.controller('ReportController',
  function ($scope, $timeout, $compile, $filter, $http, $interval, uiGridGroupingConstants, uiGridConstants) {
    // ['$scope', '$compile', '$filter', '$http', '$interval', 'uiGridGroupingConstants', function ($scope, $compile, $filter, $http, $interval, uiGridGroupingConstants) {
    ctrl.ReportController = $scope;
    ctrl.ReportController.compile = $compile;
    $scope.jobs1 = [{ id: 1, name: "Naveed" }, { id: 2, name: "Naveed" }];
    $scope.operators = [];
    $scope.init = function () {
      var now = new Date();
      var day = now.getDate();
      var month = now.getMonth();
      var year = now.getFullYear();
      $scope.dFrom = new Date(year, month, day, 08, 00);
      $scope.dTo = new Date(year, month, day, 20, 00);
      height = 30;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $scope.gridOptions.rowHeight = 15
      }
      
    };
    $scope.gridOptions = {
      enableFiltering: true,
      data: [],
      onRegisterApi: function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.core.handleWindowResize();
      },
      columnDefs: [

      ]
    };
    ctrl.ReportController.getJobsvalueLabelPair = function () {
      var jobsvalpair = [];
      $scope.jobs.forEach(function (item) {
        jobsvalpair.push({ value: item.id, label: item.jobname });
      });
      return jobsvalpair;
    };
    $scope.getFromDate = function () { return $filter('date')($scope.dFrom, "yyyy-MM-ddTHH:mm"); };
    $scope.getToDate = function () { return $filter('date')($scope.dTo, "yyyy-MM-ddTHH:mm"); };
    $scope.searchdb = function () {
      $('.navbar-collapse').removeClass('in');


      var reportData;
      // switch ($scope.selectedReportType.id) {
      //   case "cycle":
      reportData = appdata.cycle.cycleReport($scope.selectedDayReportType.id, $scope.getFromDate(), $scope.getToDate(), $scope.selectedMachine.id, uiGridGroupingConstants, uiGridConstants);
      $scope.gridfields = reportData.gridfields;
      //   break;
      // case "job":
      //   reportData = appdata.job.jobReport($scope.selectedDayReportType.id, $scope.getFromDate(), $scope.getToDate(), uiGridGroupingConstants);
      //   $scope.gridfields = reportData.gridfields;
      //   break;
      // case "operator":
      //   break;

      // }
      $('#loader1').show();
      console.log(reportData.url);
      $.getJSON(reportData.url, function (sdata) {
        $scope.gridOptions.columnDefs = $scope.gridfields;
        $scope.gridOptions.data = sdata;
        $scope.reportData = sdata;
        $('#loader1').fadeOut('slow');
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
        $scope.refreshGrid();
      }).error(function (err) {
        $('#loader1').fadeOut('slow');
        console.log(err);
      });
    $('.report-ui-grid').css('width', '99%');
      
    };

    $scope.operatorChanged = function (operator) {
      $scope.selectedOperator = operator;
    };
    $scope.setJobs = function (jobsData) {
      $scope.jobs = angular.extend(jobsData);
      $scope.jobs.unshift({ jobid: -1, jobname: "All Jobs" });
      $scope.selectedJob = $scope.jobs[0];
      $scope.$apply();
    };
    $scope.selectedJobChanged = function (job) {
      $scope.selectedJob = job;
    }
    $scope.setOperators = function (operators) {
      $scope.operators = operators;
      $scope.selectedOperator = operators[0];
      $scope.$apply();
    };
    $scope.machines = [
      { id: 00, name: "All Machines" },
      { id: 26, name: "Machine 1" },
      { id: 19, name: "Machine 2" },
      { id: 13, name: "Machine 3" },
      { id: 06, name: "Machine 4" },
      { id: 22, name: "Machine 5" },
      { id: 27, name: "Machine 6" },
      { id: 17, name: "Machine 7" }
    ];
    // $scope.getMachineById = function (mid) {
    //   for (var i = 0; i < $scope.machines.length; i++) {
    //     if ($scope.machines[i].id == mid) {
    //       return $scope.machines[i];
    //     }
    //   }
    // };
    $scope.selectedMachine = $scope.machines[1];

    $scope.machineChanged = function (machine) {
      $scope.selectedMachine = machine;
      if ($scope.selectedMachine.id === 0 && $scope.selectedDayReportType.id === "dt") {
        $scope.selectedDayReportType = $scope.reportDayTypes[1];
      }
    };
    $scope.reportDayTypes = [
      { id: 'detailed', name: "Detailed" },
      { id: 'dailyShiftCount', name: "Daily Shift Count" },
      { id: 'monthlyShiftcount', name: "Monthly Shift Count" }
    ];
    $scope.selectedDayReportType = $scope.reportDayTypes[0];

    $scope.reportDayTypeChanged = function (reportDayType) {
      $scope.selectedDayReportType = reportDayType;
      if ($scope.selectedMachine.id === 0 && $scope.selectedDayReportType.id === "dt") {
        $scope.selectedMachine = $scope.machines[1];
      }
    };
    $scope.jobChange = function (jobid) {
      $('#loader1').show();
      var url = "http://trendzsoft.in/api/updatemachinestatus.php?" + "type=job&tval='" + seljob.id + "'&ip='" + macid + "'";
      $.getJSON(url, function (sdata) {

        $('#loader1').hide();
      });
      return false;
    };
    $scope.refreshGrid = function () {
      $scope.refresh = true;
      $timeout(function () {
        $scope.gridApi.grid.refresh();
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
        $scope.refresh = false;
      }, 100);
    };
  })
  .filter('mapJob', function () {
    return function (input) {
      if (input) {
        for (var i = 0; i < ctrl.ReportController.jobs.length; i++) {
          if (ctrl.ReportController.jobs[i].id == input) {
            return ctrl.ReportController.jobs[i].jobname;
          }
        }
      }
      return "";
    };
  })
  .filter('mapOperator', function () {
    return function (input) {
      if (input) {
        for (var i = 0; i < ctrl.ReportController.operators.length; i++) {
          if (ctrl.ReportController.operators[i].id == input) {
            return ctrl.ReportController.operators[i].opname;
          }
        }
      }
      return "";
    };
  });
