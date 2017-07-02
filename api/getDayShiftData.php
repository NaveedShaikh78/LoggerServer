<?php
require 'includes/connectdb.php';
$conn = connect();
 $st=str_replace("T"," ",$_GET["st"]);
 $et=str_replace("T"," ",$_GET["et"]);
 $ip=$_GET["ip"];
 $machine=$_GET["machine"];

 $byMachine="";
 $filtMachine="and ioport=$ip";
if(isset($machine))
{
$byMachine = ",t.ioport";
$filtMachine = "";
}
$sql=<<<EOT
select 
	 t.cycledate, sum(t.shift1) as Shift1,sum(t.shift2) as Shift2,count(*) DayTotal $byMachine
from (select 
			  ioport as ioport,
      		  case when start_time > STR_TO_DATE(CONCAT( DATE(start_time), ' 00:00:00'),'%Y-%m-%d %H:%i:%s') 
			 		   && start_time < STR_TO_DATE(CONCAT( DATE(start_time), ' 08:00:00'),'%Y-%m-%d %H:%i:%s')
						  then  DATE_SUB(DATE(start_time),INTERVAL 1 DAY)
      			  else DATE(start_time)
      		  end as cycledate,
      		  start_time as start_time,
      		  @shift1:=
			  case when start_time > STR_TO_DATE(CONCAT( DATE(start_time), ' 08:00:00'),'%Y-%m-%d %H:%i:%s') 
			 		   && start_time < STR_TO_DATE(CONCAT( DATE(start_time), ' 20:00:00'),'%Y-%m-%d %H:%i:%s')
						  then 1
      			  else 0	
			 end as shift1, 
			 case when @shift1 = 0
				  	   then 1
      			  else 0
			 end as shift2 
	  from machinelog where cycletime>20 $filtMachine and start_time between $st and $et
	 ) t group by  t.cycledate $byMachine
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