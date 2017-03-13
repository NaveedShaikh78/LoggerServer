optgridfields=[
            { name: "operator_name", type: "text",title :"Operator Name" ,width:500 },
            ];

jobgridfields=[
            { name: "job_name", type: "text",title :"Job Name" ,width:500 },
            ];
			
//Operator Registration Dialog			
$( function() {
    $( "#operator" ).dialog({ 
				closeOnEscape: true,
               /*modal: true,
			    open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }*/
	});
  });
  
$( function() {
    $( "#job" ).dialog({ 
				closeOnEscape: false,
               /*modal: true,
			    open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }*/
	});
  });

  $(function(){

    $(".dropdown-menu li a").click(function(){

      $(".btn:first-child").text($(this).text());
      $(".btn:first-child").val($(this).text());

   });

});

$("#optgrid").jsGrid({
        width: "100%",
        inserting: false,
        editing: false,
        sorting: true,
        paging: false,
        pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount} ",
        data: [{operator_name : 'shekhar patil'},
		{operator_name : 'shekhar patil'},
		{operator_name : 'shekhar patil'},
		{operator_name : 'shekhar patil'},
		{operator_name : 'shekhar patil'},
		{operator_name : 'shekhar patil'},
		{operator_name : 'shekhar patil'},
		{operator_name : 'shekhar patil'},
		{operator_name : 'shekhar patil'},
		{operator_name : 'shekhar patil'},
		{operator_name : 'shekhar patil'},
		{operator_name : 'shekhar patil'},
		{operator_name : 'shekhar patil'},
		{operator_name : 'shekhar patil'},
		
		],
        fields: optgridfields
    });
$("#jobgrid").jsGrid({
        width: "100%",
        inserting: false,
        editing: false,
        sorting: true,
        paging: false,
        pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount} ",
        data: [
		{job_name : 'job allocation 1'},
		{job_name : 'job allocation 2'},
		{job_name : 'job allocation 3'},
		{job_name : 'job allocation 4'},
		{job_name : 'job allocation 5'},
		{job_name : 'job allocation 6'},
		{job_name : 'job allocation 7'},
		{job_name : 'job allocation 8'},
		{job_name : 'job allocation 9'},
		{job_name : 'job allocation 10'},
		{job_name : 'job allocation 11'},
		{job_name : 'job allocation 12'},
		{job_name : 'job allocation 13'},
		{job_name : 'job allocation 14'},
		
		],
        fields: jobgridfields
    });


