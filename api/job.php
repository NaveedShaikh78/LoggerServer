<?php
require 'includes/connectdb.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
print("\n");
$conn = connect();
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
    $sql = "update table  job set jobid='$jobid', jobname='$name',jobdesc='$desc' where jobid ='$id'";
}
$retval = mysql_query( $sql, $conn );
  if(! $retval )
  {
    print json_encode([ mysql_error()]);
    die('');
  }
$rows=[];
while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
  {
  $rows[] = $row;
  }
mysql_close($conn);
print json_encode($rows);
return;
?>
