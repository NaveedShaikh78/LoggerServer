<?php
  require 'connectdb.php';
  $conn = connect();
  $st=$_GET["st"];
  $et=$_GET["et"];
  $ip=$_GET["ip"];
  $jn=$_GET["jn"];

$sql = "SELECT @lastRecord:= srno,end_time,@totalidlesec:=TIMESTAMPDIFF(SECOND,end_time,str_to_date($st,'%Y-%m-%d %H:%i:%s')) from machinelog where ioport=$ip and srno=(SELECT MAX(srno) FROM machinelog  where ioport=$ip );";
$retval = mysql_query($sql , $conn);
  if(!$retval)
   {
  die("Fail 1 ".mysql_error);
   } 

$sql = "UPDATE machinelog SET idletime=@totalidlesec where ioport=$ip and srno=@lastRecord;";
$retval = mysql_query($sql , $conn);
  if(!$retval)
   {
  die("Fail 2 ".mysql_error);
   } 

$sql = "INSERT INTO machinelog( start_time, end_time, cycletime, ioport, jobno) VALUES ($st,$et,TIMESTAMPDIFF(SECOND,str_to_date($st,'%Y-%m-%d %H:%i:%s'),str_to_date($et,'%Y-%m-%d %H:%i:%s')),$ip,$jn);";
$retval = mysql_query($sql , $conn);
  if(!$retval)
   {
  die("Fail 3 ".mysql_error);
  } 
	
echo "success";
mysql_close($conn);
?>