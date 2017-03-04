<?php
require 'connectdb.php';
$conn = connect();
$st=$_GET["st"];
$et=$_GET["et"];
$ip=$_GET["ip"];
$sql="select t.shift,count(*)as cnt from (select start_time as st, case when start_time > STR_TO_DATE(CONCAT( DATE(start_time), ' 08:00:00'),'%Y-%m-%d %H:%i:%s') && start_time < STR_TO_DATE(CONCAT( DATE(start_time), ' 20:00:00'),'%Y-%m-%d %H:%i:%s') then CONCAT( DATE(start_time), ' Shift1') when start_time > STR_TO_DATE(CONCAT( DATE(start_time),' 20:00:00'),'%Y-%m-%d %H:%i:%s')then CONCAT( DATE(start_time), ' Shift2') else CONCAT(  DATE_SUB(DATE(start_time),INTERVAL 1 DAY), ' Shift2') end as shift from machinelog where cycletime>20 and ioport=$ip and start_time between $st and $et) t group by t.shift";
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