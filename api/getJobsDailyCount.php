<?php
require 'includes/connectdb.php';
$conn = connect();
$st=str_replace("T"," ",$_GET["st"]);
$et=str_replace("T"," ",$_GET["et"]);
$jobno=$_GET["jobno"];
 
$sql=<<<EOT
select 
	 t.cycledate, count(*) DayTotal, jobno as jobno
from (select 
              jobno as jobno
			  ioport as ioport,
      		  DATE(start_time) as cycledate,
      		  start_time as start_time,
      		  
	  from machinelog where cycletime>20 and jobno=$jobno and start_time between $st and $et
	 ) t group by  t.cycledate, t.jobno
EOT;
  	$retval = mysql_query( $sql, $conn );
   	if(! $retval )
 	 {
  	 	die('Could not get data:$sql--- ' . mysql_error());
  	 }
 $rows=[];
while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
  	{
		$rows[] = $row;
  	}
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
print("\n"); 
	print json_encode($rows);
  	mysql_close($conn);
?>