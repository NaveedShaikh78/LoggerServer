<?php
require 'includes/connectdb.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
print("\n");
$conn = connect();
$id=$_POST['id'];
$rtype=$_POST['rtype'];
$jobid=$_POST['jobid'];
$name=$_POST['jobname'];
$desc=$_POST['jobdesc'];
if($rtype=="getData")
{
  $sql="select * from job";
}
elseif ($rtype == "insertData")
{
    $sql = "insert into job(jobid,jobname,jobdesc) values('$jobid','$name','$desc')";
}
elseif ($rtype == "updateData")
{
    $sql = "update  job set jobid='$jobid', jobname='$name',jobdesc='$desc' where id ='$id'";
}
elseif ($rtype == "deleteData")
{
    $sql = "delete from  job  where id ='$id'";
}
$retval = mysql_query( $sql, $conn );

  if(! $retval )
  {
    print json_encode([$sql]);
    die('');
  }
$rows=[];
while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
  {
  $rows[] = $row;
  }
  if ($rtype == "insertData")
  {
      print json_encode([mysql_insert_id()]);
      return;
  }
mysql_close($conn);
print json_encode($rows);
return;
?>
