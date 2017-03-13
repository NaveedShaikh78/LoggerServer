<?php
$user=$_POST['username'];
$cuid=$_POST['cuid'];
$password=$_POST['password'];
header('Access-Control-Allow-Origin: *');
session_start();
if($cuid!="")
{
session_id($cuid);	
}
else
{
$cuid=session_id();	
}
require 'includes/connectdb.php';
$conn = connect();
$sql = "SELECT *  FROM login where userID = '$user' and password='$password'";
$retval = mysql_query( $sql, $conn );
if(! $retval )
 {
 	die('Could not get data: ' . mysql_error());
 }
while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
	{
	$_SESSION['loggedin'] = $cuid;
	} 
if(	mysql_num_rows($retval)==0)
{
$_SESSION['loggedin'] = "Failed";
}
session_write_close();
print $_SESSION['loggedin'] ;	

mysql_close($conn);
?>
