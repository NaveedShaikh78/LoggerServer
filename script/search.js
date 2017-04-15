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

//loadReportGrid();
function searchdb(){

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
  gridfields=[  { name: "srno", type: "text", title:"Id", width: 50, css: "hide" },
				{ name: "start_time", type: "text",title :"Start Time", width:110,editing: false },
                { name: "end_time", type: "text",title :"End Time",editing: false},
                { name: "cycletime", type: "text",title :"Cycle Time",editing: false},
                { name: "idletime", type: "text",title : "Idle Time",editing: false},
                { name: "jobno", type: "select",title : "Job Id",items: ctrl.MachineController.jobs, valueField: "id", textField: "jobname",
                  headerTemplate: function() {
                     return $("<select>")
                            .attr("text", "Job")
                            .attr("ng-change", "jobChange(job.id)")
                            .attr("ng-model", "job")
                            .attr("ng-options", "job.jobname for job in jobs")
                            .text("Job");
                            }
                },
                { name: "opid", type: "select",title : "Operator Id",items: ctrl.MachineController.operators, valueField: "id", textField: "opname"},

                    { type: "control" , deleteButton: false }
                 ];

}
$.getJSON(url2, function( sdata ) {
$('#macJobCount').text("Total Jobs count:"+sdata[0].count);
 });

//$.getJSON(url1, function( sdata ) {
loadReportGrid(url1);
//$('#bs-example-navbar-collapse-1').removeClass('in');
//});
}
function loadReportGrid(url1){
  $("#jsGrid").jsGrid({
       width: "100%",
        delete:false,
      inserting: false,
      autoload: true,
       editing: true,
       sorting: false,
       paging: false,
	   controller:	{
       loadData: function() {
           var d = $.Deferred();
           $.get(url1
           ).done(function(response) {
               d.resolve(response);
           });
           return d.promise();
       },
		   updateItem: function(item){
			   var d = $.Deferred();
			   item.rtype="updateData";
			   $.post("http://trendzsoft.in/api/updateReport.php", item
			   ).done(function(response){
					d.resolve(item);
			   });
			   return d.promise();
		   }

	   },

       pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount} ",
       fields: gridfields
   });

 }
