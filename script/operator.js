

$(document).ready(function(){
    var count = 1;
	$("#menusetting a").click(function(){
		
		$("#menusetting a").removeClass('active-tab-menu');
		$("#submenu1").toggle();
		if (count == 1)
		{
			$("#appviewbase").show();
		}
		if (count == 2)
		{
			$("#demodiv").show();
		}
		if (count == 3)
		{
			$("#operator").show();
		}
		if (count == 4)
		{
			$("#job").show();
		}
		
	});
	
	$("#menuappview a").click(function(){
        count = 1;
		$("#submenu1").hide();
    });
	$("#menureport a").click(function(){
        count = 2;
		$("#submenu1").hide();
    });
	$("#menuoperator a").click(function(){
		count = 3;
        $("#submenu1").hide();
    });
	$("#menujob a").click(function(){
        count = 4;
		$("#submenu1").hide();
    });
		
	
});





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

