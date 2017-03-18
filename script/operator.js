appdata.optgridData=[];
appdata.optgridfields=[
			{ name: "id", type: "text",title :"Operator ID" ,width:210,css:"hide"},
            { name: "opid", type: "number", title: "Operator ID",width:210},
            { name: "opname", type: "text", title: "Operator Name" ,width:210},
             { type: "control",width:210 }
            ];
loadOptGrid();

function loadOptGrid(){
$("#optgrid").jsGrid({
   height: "70%",
    width: "100%",
    filtering: false,
    editing: true,
    inserting: true,
    sorting: true,
    paging: true,
    autoload: true,
    pageSize: 10,
    pageButtonCount: 5,
	
	
	controller: {
            loadData: function(filter) {
                var d = $.Deferred();
                $.post("http://pi.trendzsoft.in/api/operator.php",
                    {"rtype":"getData"}
                ).done(function(response) {
					response = $.grep(response, function(item) {
                       /*if(filter.opid !==""){
                         return item.opid.toUpperCase().includes( filter.opid.toUpperCase());
                        }
                        if(filter.opname !==""){
                        return item.opname.toUpperCase().includes( filter.opname.toUpperCase());
                        }*/
                      return true;
                    });
	
                    d.resolve(response);
                });
                return d.promise();
            },
            updateItem: function(item) {
                var d = $.Deferred();
                item.rtype="updateData";
                $.post("http://pi.trendzsoft.in/api/operator.php", item
                ).done(function(response) {
                    d.resolve(item);
                });
                return d.promise();
              },
            insertItem: function(item) {
                var d = $.Deferred();
                item.rtype="insertData";
                $.post("http://pi.trendzsoft.in/api/operator.php", item
                ).done(function(response) {
                    item.id=response[0];
					d.resolve(item);
                });
                return d.promise();
              },
			  
              deleteItem: function(item) {
                  var d = $.Deferred();
                  item.rtype="deleteData";
                  $.post("http://pi.trendzsoft.in/api/operator.php", item
                  ).done(function(response) {
                      d.resolve(true);
                  });
                  return d.promise();
                },
			  
        },
	
	rowClick: function(args) { return false;},
    deleteConfirm: "Do you really want to delete this record?",
    pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount} ",
    data: appdata.optgridData,
    fields:appdata.optgridfields
    });
}
