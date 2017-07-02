var jobgridfields = [
  { name: "job_name", type: "text", title: "Job Name", width: 500 },
];
var tempid = 0;
var gridfields = [];
var searchData = [];
var acceptDataButton ={};

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
  var url1 = "http://trendzsoft.in/api/getstatus.php?" + "st='" + dfrom + "'&et='" + dTo + "'&mac='" + ctrl.ReportController.selectedMachine.id + "'";
  var url2 = "http://trendzsoft.in/api/getMachineCount.php?" + "st='" + dfrom + "'&et='" + dTo + "'&ip='" + ctrl.ReportController.selectedMachine.id + "'";

  if (ctrl.ReportController.selectedReportType.id === "dsc") {
    gridfields = [
      { name: "cycledate", type: "text", title: "Date" },
      { name: "Shift1", type: "text", title: "Shift1" },
      { name: "Shift2", type: "text", title: "Shift2" },
      { name: "DayTotal", type: "text", title: "Total" },
    ];
    url1 = "http://trendzsoft.in/api/getDayShiftData.php?" + "st='" + dfrom + "'&et='" + dTo + "'&ip='" + ctrl.ReportController.selectedMachine.id + "'";
    if (ctrl.ReportController.selectedMachine.id == 0) {
    url1 = "http://trendzsoft.in/api/getDayShiftData.php?" + "st='" + dfrom + "'&et='" + dTo + "'&ip='" + ctrl.ReportController.selectedMachine.id + "'&machine='all'";
      gridfields.unshift({ name: "ioport", type: "text", title: "Machine" });
    }
  }
  else {
    gridfields = [{ name: "srno", type: "text", title: "Id", width: 50, css: "hide" },
{ name: "start_time", type: "text", title: "Start Time", width: 110, editing: false },
{ name: "end_time", type: "text", title: "End Time", editing: false },
{ name: "cycletime", type: "text", title: "Cycle Time", editing: false },
{ name: "idletime", type: "text", title: "Idle Time", editing: false },
{
  name: "jobno", type: "select", title: "Job Id", items: [], valueField: "id", textField: "jobname",
  headerTemplate: function () {
    var jobListelm = $("<select style='width:100%;height:100%;border:0'><option selected hidden  value='' > Job</option></select>");
    //return  document.importNode(document.getElementById("reportJobs"));
    if (ctrl.MachineController) {
      $.each(ctrl.MachineController.jobs, function (val, item) {
        jQuery('<option/>', {
          value: item.id,
          html: item.jobname
        }).appendTo(jobListelm);
      });
    }
    jobListelm.change(function (citem) {
      var postData = {};
      postData.id = $(this).find("option:selected").val();
      $.each(searchData, function (val, item) {
        item.jobno = postData.id;
      });
      $("#jsGrid").jsGrid("refresh");
      $("#updateLogData").show();
      //$(this).parent().append("<input id='updateJobs' class='jsgrid-button jsgrid-update-button' type='button' title='Update'>");

    });
    return jobListelm;
  }
},
{
  name: "opid", type: "select", title: "Operator Id", items: [], valueField: "id", textField: "opname",

  headerTemplate: function () {
    var opListelm = $("<select style='width:100%;height:100%;border:0'><option selected hidden  value='' > Operator</option></select>");
    //return  document.importNode(document.getElementById("reportJobs"));
    if (ctrl.MachineController) {
      $.each(ctrl.MachineController.operators, function (val, item) {
        jQuery('<option/>', {
          value: item.id,
          html: item.opname
        }).appendTo(opListelm);
      });
    }
    opListelm.change(function (citem) {
      var postData = {};
      postData.id = $(this).find("option:selected").val();
      $.each(searchData, function (val, item) {
        item.opid = postData.id;
      });
      $("#jsGrid").jsGrid("refresh");
      $("#updateLogData").show();
      //$(this).parent().append("<input id='updateJobs' class='jsgrid-button jsgrid-update-button' type='button' title='Update'>");

    });
    return opListelm;
  }

},

{
  type: "control", deleteButton: false, headerTemplate: function () {
    var updateLogData = $("<input id='updateLogData' class='jsgrid-button jsgrid-update-button' style='Display: none;' type='button' title='Update'>");
    updateLogData.click(function () {
      $(this).hide();
      $('#loader1').fadeIn('slow');
      updateLogDataAll(0);
    });
    return updateLogData;
  }
}
];
    gridfields[5].items = ctrl.MachineController.jobs;
    gridfields[6].items = ctrl.MachineController.operators;
  }
  $.getJSON(url2, function (sdata) {
    $('#macJobCount').text("Total Jobs count:" + sdata[0].count);
  });

  $.getJSON(url1, function (sdata) {
    //cyclechart(sdata);
    if (ctrl.ReportController.selectedReportType.id === "dsc") {
      for(var i=0;i<sdata.length;i++){
      sdata[i].ioport=   ctrl.ReportController.getMachineById(sdata[i].ioport).name;
      }
    }
    loadReportGrid(sdata);
  });
}
function updateLogDataAll(index) {
  if (searchData) {
    var item = searchData[index];
    if (item) {
      item.rtype = "updateData";
      $.post("http://trendzsoft.in/api/updateReport.php", item)
        .done(function (response) {
          updateLogDataAll(index + 1);
        });
    } else {
      $('#loader1').fadeOut('slow');
    }
  }
}
function updateLogData(item) {
  var d = $.Deferred();
  item.rtype = "updateData";
  $.post("http://trendzsoft.in/api/updateReport.php", item
  ).done(function (response) {
    d.resolve(item);
  });
  return d.promise();
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
