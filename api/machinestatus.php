<?php

include('includes/header.php');
require 'includes/connectdb.php';

$conn = connect();
date_default_timezone_set('Asia/Kolkata');
$currentDate = date("Y-m-d H:i:s");
$startDate = date("Y-m-d H:i:s",strtotime(date("Y-m-d")." 08:00:00"));
$startDate1 = date("Y-m-d H:i:s",strtotime(date("Y-m-d")." 08:00:00 + 1 day"));
$endDate = date("Y-m-d H:i:s", strtotime(date("Y-m-d")." 20:00:00"));
$condition="";
if ($startDate < $currentDate  && $currentDate <$endDate  )
{
  $condition= "'".$startDate ."' and '".$endDate."'"  ;
}
else
{
	if($endDate>$currentDate)
	{
		$endDate = date("Y-m-d H:i:s", strtotime(date("Y-m-d")." 20:00:00 - 1 day"));
		$startDate1 = date("Y-m-d H:i:s",strtotime(date("Y-m-d")." 08:00:00"));
	}
 $condition= "'".$endDate ."' and '".$startDate1."'"  ;
	
}

$sql="select count(*) as count,machinestatus.ioport,machinestatus.statetime,machinestatus.status from machinestatus inner join machinelog on machinestatus.ioport = machinelog.ioport where machinelog.start_time between ".$condition." and TIMESTAMPDIFF(SECOND,machinelog.start_time,machinelog.end_time)>20  group by  machinestatus.ioport,machinestatus.statetime,machinestatus.status";

  	$retval = mysql_query( $sql, $conn );
  	if(! $retval )
 	 {
  	 	die('Could not get data: ' . mysql_error());
  	 }
   $rows=[];
while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
  	{
		$rows[$row['ioport']] = $row;
  	} 
	header('Content-Type: application/json');
	header('Access-Control-Allow-Origin: *');
	print json_encode($rows);
  	mysql_close($conn);
?>