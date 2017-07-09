loggerApp.controller('ReportController', function ($scope, $compile, $filter) {
  ctrl.ReportController = $scope;
  ctrl.ReportController.compile = $compile;
  $scope.jobs = [];
  $scope.init = function () {
    var now = new Date();
    var day = now.getDate();
    var month = now.getMonth();
    var year = now.getFullYear();
    $scope.dFrom = new Date(year, month, day, 08, 00);
    $scope.dTo = new Date(year, month, day, 20, 00);
  }
  $scope.getFromDate = function () { return $filter('date')($scope.dFrom, "yyyy-MM-ddTHH:mm"); };
  $scope.getToDate = function () { return $filter('date')($scope.dTo, "yyyy-MM-ddTHH:mm"); };
  $scope.searchdb = function () {
    switch ($scope.selectedReportType) {
      case "cycle":
        var reportData = appdata.cycle.cycleReport($scope.selectedDayReportType.id, $scope.getFromDate(), $scope.getToDate());
        $scope.gridfields = reportData.gridfields;
        break;
      case "job":
        break;
      case "operator":
        break;

    }

    $.getJSON(reportData.url, function (sdata) {
      //cyclechart(sdata);
      console.log(reportData.url);
      if ($scope.selectedDayReportType.id === "dsc") {
        for (var i = 0; i < sdata.length; i++) {
          sdata[i].ioport = $scope.getMachineById(sdata[i].ioport).name;
        }
      }
      $scope.loadReportGrid(sdata);
    });
  };
  $scope.loadReportGrid = function (sdata) {
    searchData = sdata;
    $('#loader1').fadeIn('slow');
    $("#jsGrid").jsGrid({
      width: "100%",
      delete: false,
      inserting: false,
      editing: true,
      sorting: true,
      paging: false,
      controller: {
        updateItem: function (item) {
          return updateLogData(item);
        }
      },
      pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount} ",
      data: searchData,
      fields: $scope.gridfields
    });
    $('#loader1').fadeOut('slow');
  }
  $scope.setJobs = function (jobsData) {
    $scope.jobs = angular.extend(jobsData);
    $scope.jobs.unshift({ jobid: -1, jobname: "All Jobs" });
    $scope.selectedJob = $scope.jobs[0];
    $scope.$apply();
  };
  $scope.selectedJobChanged = function (job) {
    $scope.selectedJob = job;
  }
  $scope.setOperators = function (jobsData) {
    $scope.jobs = jobsData;
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
  $scope.getMachineById = function (mid) {
    for (var i = 0; i < $scope.machines.length; i++) {
      if ($scope.machines[i].id == mid) {
        return $scope.machines[i];
      }
    }
  };
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
  $scope.reportTypes = [
    { id: 'cycle', name: "Cycle" },
    { id: 'job', name: "Job" },
    { id: 'operator', name: "Operator" }
  ];
  $scope.selectedReportType = $scope.reportTypes[0];

  $scope.reportTypeChanged = function (reportType) {
    $scope.selectedReportType = reportType;

  };
  $scope.jobChange = function (jobid) {
    $('#loader1').show();
    var url = "http://trendzsoft.in/api/updatemachinestatus.php?" + "type=job&tval='" + seljob.id + "'&ip='" + macid + "'";
    $.getJSON(url, function (sdata) {

      $('#loader1').hide();
    });
    return false;
  }
});
