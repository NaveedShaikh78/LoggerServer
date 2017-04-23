 
loadIdleGrid();
function loadIdleGrid(){
  var idlegridfields=[
              { name: "id", type: "text",title :"ID" ,width:210,css:""

              },
              { name: "idleid", type: "text",title :"Idle Id",width:50,
                validate: { message: "Idle Id can not be emty", validator: function(value) { return value !=""; } }
              },
              { name: "idledesc", type: "text",title :"Idle Description",width:120

              },
              { type: "control" }
              ];
$("#idlegrid").jsGrid({
  height: "90%",
     width: "100%",
   filtering: true,
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
                $.post("http://trendzsoft.in/api/idle.php",
                    {"rtype":"getData"}
                ).done(function(response) {
                  ctrl.MachineController.setIdle(response);
                     response = $.grep(response, function(item) {
                       
                      return true;
                    });

                    d.resolve(response);
                });
                return d.promise();
            },
            updateItem: function(item) {
                var d = $.Deferred();
                item.rtype="updateData";
                $.post("http://pi.trendzsoft.in/api/idle.php", item
                ).done(function(response) {
                    d.resolve(item);
                });
                return d.promise();
              },
            insertItem: function(item) {
                var d = $.Deferred();
                item.rtype="insertData";
                $.post("http://pi.trendzsoft.in/api/idle.php", item
                ).done(function(response) {
                    item.id=response[0];
                    d.resolve(item);
                });
                return d.promise();
              },

              deleteItem: function(item) {
                  var d = $.Deferred();
                  item.rtype="deleteData";
                  $.post("http://pi.trendzsoft.in/api/idle.php", item
                  ).done(function(response) {
                      d.resolve(true);
                  });
                  return d.promise();
                },
        },
   rowClick: function(args) { return false;},
   deleteConfirm: "Do you really want to delete this record?",
   pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount} ",
   fields:idlegridfields
  });
}
