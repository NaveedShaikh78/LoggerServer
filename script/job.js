
jobgridData=[];
jobgridfields=[
            { name: "job_name", type: "text",title :"Job Name" ,width:1500 },
            ];
loadJobGrid();
			
addJob=function (){
	jobgridData.push({job_name:$("#txtJobName").val()});
	loadJobGrid();
}

function deleteJob(){
	
	jobgridfields.IndexOf();
}
function loadJobGrid(){
$("#jobgrid").jsGrid({
        width: "100%",
        inserting: false,
        editing: false,
        sorting: true,
        paging: false,
        pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount} ",
        data: jobgridData,
        fields: jobgridfields
    });
}
