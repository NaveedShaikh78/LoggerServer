
loadJobGrid();
function loadJobGrid(){
  var jobgridfields=[
              { name: "id", type: "text",title :"Job ID" ,width:210,css:"hide"

              },
              { name: "jobid", type: "text",title :"Job ID" ,width:50,
                validate: { message: "Job ID can not be emty", validator: function(value) { return value !=""; } }
              },
              { name: "jobname", type: "text",title :"Job Name",width:50,
                validate: { message: "Job Name can not be emty", validator: function(value) { return value !=""; } }
              },
              { name: "jobdesc", type: "text",title :"Job Description",width:120

              },
              { type: "control" }
              ];
$("#jobgrid").jsGrid({
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
                $.post("http://pi.trendzsoft.in/api/job.php",
                    {"rtype":"getData"}
                ).done(function(response) {
                  ctrl.MachineController.setJobs(response);
                     response = $.grep(response, function(item) {
                       if(filter.jobid !==""){
                         return item.jobid.toUpperCase().includes(filter.jobid.toUpperCase());
                        }
                        if(filter.jobname !==""){
                        return item.jobname.toUpperCase().includes(filter.jobname.toUpperCase());
                        }
                        if(filter.jobdesc !==""){
                        return item.jobdesc.toUpperCase().includes(filter.jobdesc.toUpperCase());
                        }
                      return true;
                    });

                    d.resolve(response);
                });
                return d.promise();
            },
            updateItem: function(item) {
                var d = $.Deferred();
                item.rtype="updateData";
                $.post("http://pi.trendzsoft.in/api/job.php", item
                ).done(function(response) {
                    d.resolve(item);
                });
                return d.promise();
              },
            insertItem: function(item) {
                var d = $.Deferred();
                item.rtype="insertData";
                $.post("http://pi.trendzsoft.in/api/job.php", item
                ).done(function(response) {
                    item.id=response[0];
                    d.resolve(item);
                });
                return d.promise();
              },

              deleteItem: function(item) {
                  var d = $.Deferred();
                  item.rtype="deleteData";
                  $.post("http://pi.trendzsoft.in/api/job.php", item
                  ).done(function(response) {
                      d.resolve(true);
                  });
                  return d.promise();
                },
        },
   rowClick: function(args) { return false;},
   deleteConfirm: "Do you really want to delete this record?",
   pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount} ",
   fields:jobgridfields
  });
}
