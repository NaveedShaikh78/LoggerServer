


jobgridfields=[
            { name: "job_name", type: "text",title :"Job Name" ,width:500 },
            ];


$("#jsGrid").show();

function liveMachineStatus(){
$("#machinecontainer").show();
$("#jsGrid").hide();
$("#macJobCount").hide();
}
function searchdb(){
  $('#loader1').show();

var dfrom=document.getElementById("dateFrom").value;
var dTo=document.getElementById("dateTo").value;
var url1 = "http://trendzsoft.in/api/getstatus.php?" + "st='" + dfrom + "'&et='" + dTo + "'&mac='" + selectedMachine + "'";

var url2 = "http://trendzsoft.in/api/getMachineCount.php?" + "st='" + dfrom + "'&et='" + dTo + "'&ip='" + selectedMachine + "'";
var gridfields=[
            { name: "start_time", type: "text",title :"Start Time", width:230 },
            { name: "end_time", type: "text",title :"End Time"},
			{ name: "cycletime", type: "text",title :"Cycle Time"},
			{ name: "idletime", type: "text",title : "Idle Time"},
			{ name: "Country", type: "select", items: ctrl.MachineController.jobs, valueField: "id", textField: "jobname" },
             ];
if(reportType==="dsc"){
    var url1 = "http://trendzsoft.in/api/getDayShiftData.php?" + "st='" + dfrom + "'&et='" + dTo + "'&ip='" + selectedMachine + "'";
gridfields=[
            { name: "shift", type: "text",title :"Day/Shift" },
            { name: "cnt", type: "text",title :"Count"},
             ];
}
else{

gridfields=[
            { name: "start_time", type: "text",title :"Start Time",width:200 },
            { name: "end_time", type: "text", title: "End Time", width: 200 },
			{ name: "cycletime", type: "text",title :"Cycle"},
			{ name: "idletime", type: "text",title : "Idle"},
             ];
}
 $.getJSON(url2, function( sdata ) {
$('#macJobCount').text("Total Jobs count:"+sdata[0].count);
 });

 $.getJSON(url1, function( sdata ) {

    $("#jsGrid").jsGrid({
         width: "100%",

        inserting: false,
         editing: false,
         sorting: true,
         paging: false,
         pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount} ",
		 data: sdata,
         fields: gridfields
     });
   $('#loader1').fadeOut('slow');


   });
$('#bs-example-navbar-collapse-1').removeClass('in');
}
