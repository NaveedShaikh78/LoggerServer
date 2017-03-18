
appdata.jobgridData=[];
appdata.jobgridfields=[
            { name: "id", type: "text",title :"Job ID" ,width:210,css:"hide"
             
            },
            { name: "jobid", type: "text",title :"Job ID" ,width:210,
              validate: { message: "Job ID can not be emty", validator: function(value) { return value !=""; } }
            },
            { name: "jobname", type: "text",title :"Job Name",width:210,
              validate: { message: "Job Name can not be emty", validator: function(value) { return value !=""; } }
            },
            { name: "jobdesc", type: "text",title :"Job Description",width:210

            },
            { type: "control",width:210 }
            ];
loadJobGrid();
function loadJobGrid(){
$("#jobgrid").jsGrid({
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
            loadData: function() {
                var d = $.Deferred();
                $.post("http://pi.trendzsoft.in/api/job.php",
                    {"rtype":"getData"}
                ).done(function(response) {
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
                    d.resolve(item);
                });
                return d.promise();
              },
        },
   rowClick: function(args) { return false;},
   deleteConfirm: "Do you really want to delete this record?",
   pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount} ",
   data: appdata.jobgridData,
   fields:appdata.jobgridfields
  });
}
