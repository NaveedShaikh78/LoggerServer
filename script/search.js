


jobgridfields=[
            { name: "job_name", type: "text",title :"Job Name" ,width:500 },
            ];


$("#jsGrid").show();

function liveMachineStatus(){
$("#machinecontainer").show();
$("#jsGrid").hide();
$("#macJobCount").hide();
}
var gridfields=[];
gridfields=[  { name: "start_time", type: "text",title :"Start Time", width:230,editing: false },
              { name: "end_time", type: "text",title :"End Time",editing: false},
              { name: "cycletime", type: "text",title :"Cycle Time",editing: false},
              { name: "idletime", type: "text",title : "Idle Time",editing: false},
              { name: "jobno", type: "select",title : "Job",items: ctrl.MachineController.jobs, valueField: "id", textField: "jobname",
                headerTemplate: function() {
                   return $("<button>").attr("type", "button").text("Delete")
                           .on("click", function () {
                               deleteSelectedItems();
                           });
                          }
              },
              { name: "opid", type: "select",title : "Operator",items: ctrl.MachineController.operators, valueField: "id", textField: "opname"},

                  { type: "control" , deleteButton: false }
               ];
loadReportGrid();
function searchdb(){
  $('#loader1').show();

var dfrom=document.getElementById("dateFrom").value;
var dTo=document.getElementById("dateTo").value;
var url1 = "http://trendzsoft.in/api/getstatus.php?" + "st='" + dfrom + "'&et='" + dTo + "'&mac='" + selectedMachine + "'";
var  url2 = "http://trendzsoft.in/api/getMachineCount.php?" + "st='" + dfrom + "'&et='" + dTo + "'&ip='" + selectedMachine + "'";

if(reportType==="dsc"){
    var url1 = "http://trendzsoft.in/api/getDayShiftData.php?" + "st='" + dfrom + "'&et='" + dTo + "'&ip='" + selectedMachine + "'";
gridfields=[
            { name: "shift", type: "text",title :"Day/Shift" },
            { name: "cnt", type: "text",title :"Count"},
             ];
}
else{


}
 $.getJSON(url2, function( sdata ) {
$('#macJobCount').text("Total Jobs count:"+sdata[0].count);
 });

 $.getJSON(url1, function( sdata ) {
loadReportGrid(sdata);
$('#bs-example-navbar-collapse-1').removeClass('in');
});
}
function loadReportGrid(sdata){
  $("#jsGrid").jsGrid({
       width: "100%",
        delete:false,
      inserting: false,
       editing: true,
       sorting: true,
       paging: false,
       pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount} ",
   data: sdata,
       fields: gridfields
   });
 $('#loader1').fadeOut('slow');
 $('#jsGrid jsgrid-button jsgrid-delete-button').hide();


 }
