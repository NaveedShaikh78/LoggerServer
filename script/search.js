


jobgridfields=[
            { name: "job_name", type: "text",title :"Job Name" ,width:500 },
            ];

$("#jobgrid").jsGrid({
        width: "100%",
        inserting: false,
        editing: false,
        sorting: true,
        paging: false,
        pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount} ",
        data: [
		{job_name : 'job1'},
		{job_name : 'job2'},
		{job_name : 'job3'},
		{job_name : 'job4'},
		{job_name : 'job5'},
		{job_name : 'job6'},
		{job_name : 'job7'},
		{job_name : 'job8'},
		{job_name : 'job9'},
		
		],
        fields: jobgridfields
    });




function liveMachineStatus(){
$("#machinecontainer").show();
$("#jsGrid").hide();
$("#macJobCount").hide();
}
function searchdb(){
$("#jsGrid").show();
$('#macJobCount').show();
$("#machinecontainer").hide();
$('#loader').fadeIn('slow');
var dfrom=document.getElementById("dateFrom").value;
var dTo=document.getElementById("dateTo").value;
var url1 = "https://trendzsoft.ingetstatus.php?" + "st='" + dfrom + "'&et='" + dTo + "'&mac='" + selectedMachine + "'";

var url2 = "https://trendzsoft.ingetMachineCount.php?" + "st='" + dfrom + "'&et='" + dTo + "'&ip='" + selectedMachine + "'";
var gridfields=[
            { name: "start_time", type: "text",title :"Start Time" },
            { name: "end_time", type: "text",title :"End Time"},
			{ name: "cycletime", type: "text",title :"Cycle Time"},
			{ name: "idletime", type: "text",title : "Idle Time"},
             ];
if(reportType==="dsc"){
    var url1 = "https://trendzsoft.ingetDayShiftData.php?" + "st='" + dfrom + "'&et='" + dTo + "'&ip='" + selectedMachine + "'";
gridfields=[
            { name: "shift", type: "text",title :"Day/Shift" },
            { name: "cnt", type: "text",title :"Count"},
             ];
}
else{

gridfields=[
            { name: "start_time", type: "text",title :"Start Time" },
            { name: "end_time", type: "text",title :"End Time"},
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
  $('#loader').fadeOut('slow');
  

  });
$('#bs-example-navbar-collapse-1').removeClass('in');
}
optgridData=[];
optgridfields=[
            { name: "operator_name", type: "text",title :"Operator Name" ,width:1500 },
            ];
loadOptGrid();
			
addOperator=function (){
	optgridData.push({operator_name:$("#txtOperatorName").val()});
	loadOptGrid();
}

function deleteOperator(){
	
	optgridfields.IndexOf();
}
function loadOptGrid(){
$("#optgrid").jsGrid({
        width: "100%",
        inserting: false,
        editing: false,
        sorting: true,
        paging: false,
        pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount} ",
        data: optgridData,
        fields: optgridfields
    });
}


