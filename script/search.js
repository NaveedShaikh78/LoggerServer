var jobgridfields = [
  { name: "job_name", type: "text", title: "Job Name", width: 500 },
];
var tempid = 0;
var gridfields = [];
var searchData = [];
var acceptDataButton = {};

$("#jsGrid").show();

function liveMachineStatus() {
  $("#machinecontainer").show();
  $("#jsGrid").hide();
  $("#macJobCount").hide();
}

loadReportGrid();

function searchdb() {
  $('#loader1').show();

  var dfrom = document.getElementById("dateFrom").value;
  var dTo = document.getElementById("dateTo").value;
  var url1 = "";
  var url2 = appdata.baseUrl + "getJobsDailyCount.php?" + "st='" + dfrom + "'&et='" + dTo + "'&jobno='" + ctrl.ReportController.selectedJob.id + "'";
  if (ctrl.ReportController.selectedJob.id === -1) {
    gridfields = [
      { name: "jobno", type: "text", title: "Job No" },
      { name: "cycledate", type: "text", title: "Date" },
      { name: "DayTotal", type: "text", title: "Shift1" },
    ];
    url1 = appdata.baseUrl + "getDayShiftData.php?" + "st='" + dfrom + "'&et='" + dTo + "'&ip='" + ctrl.ReportController.selectedMachine.id + "'";
  }
  switch (ctrl.ReportController.selectedReportType.id) {
    case "cycle":
    break;
  }

  var reportData = appdata.cycle.
    cycleReport(ctrl.ReportController.selectedDayReportType.id, dfrom, dTo);
  gridfields = reportData.gridfields;
  url1 = reportData.url;
  $.getJSON(url2, function (sdata) {
    $('#macJobCount').text("Total Jobs count:" + sdata[0].count);
  });

  $.getJSON(url1, function (sdata) {
    //cyclechart(sdata);
    if (ctrl.ReportController.selectedDayReportType.id === "dsc") {
      for (var i = 0; i < sdata.length; i++) {
        sdata[i].ioport = ctrl.ReportController.getMachineById(sdata[i].ioport).name;
      }
    }
    loadReportGrid(sdata);
  });
}

function loadReportGrid(sdata) {
  searchData = sdata;
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
    fields: gridfields
  });
  $('#loader1').fadeOut('slow');

}
