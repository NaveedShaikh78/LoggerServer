<?php
	$dFrom=$_GET['st'];
	$dTo=$_GET['et'];
    $mac=$_GET['mac'];
	require 'connectdb.php';
	$conn = connect();
  	$sql = "SELECT DATE_FORMAT(start_time,'%d-%m-%y %h:%i:%s %p') as start_time,DATE_FORMAT(end_time,'%d-%m-%y %h:%i:%s %p') as end_time,SEC_TO_TIME(cycletime) as cycletime,SEC_TO_TIME(idletime) as idletime  FROM machinelog where start_time between {$dFrom} and {$dTo} and ioport={$mac}";
   
  	$retval = mysql_query( $sql, $conn );
  	if(! $retval )
 	 {
  	 	die('Could not get data: ' . mysql_error());
  	 }
   $rows=[];
while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
  	{
		$rows[] = $row;
  	} 
	print json_encode($rows);
  	mysql_close($conn);
?>