<?php
  require 'connectdb.php';
  $conn = connect();
  $st=$_GET["st"];
  $ip=$_GET["ip"];
  $ss=$_GET["ss"];
$sql = "UPDATE machinestatus SET statetime=$st,status=$ss where ioport=$ip;";
$retval = mysql_query($sql , $conn);
  if(!$retval)
   {
  die("Fail 1".mysql_error);
  } 
	
echo "success";
mysql_close($conn);
?>