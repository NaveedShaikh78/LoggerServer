<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require 'connectdb.php';
print("\n");
$conn = connect();
$st=$_GET["st"];
$ip=$_GET["ip"];
$ss=$_GET["ss"];
$type=$_GET["type"];
$tval=$_GET["tval"];
if($type=="op")
  {
    $sql = "UPDATE machinestatus SET opid=$tval where ioport=$ip;";
  }
if($type=="")
  {
    $sql = "UPDATE machinestatus SET jobid=$tval where ioport=$ip;";
  }
else
   {
    $sql = "UPDATE machinestatus SET statetime=$st,status=$ss where ioport=$ip;";
   }
$retval = mysql_query($sql , $conn);
if(!$retval)
   {
  die("Fail 1".mysql_error);
  }

echo "success";
mysql_close($conn);
?>
