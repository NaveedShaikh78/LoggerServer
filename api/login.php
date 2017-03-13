<?php
$user=$_POST['username'];
$password=$_POST['password'];
header('Access-Control-Allow-Origin: *');
if(isset($_SESSION['loggedin']) && $_SESSION['loggedin']==true)
{
print "success";
return;
}
$_SESSION['loggedin']=false;
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
	$_SESSION['loggedin'] = true;
	} 
if($_SESSION['loggedin'])
{
print "success";
}
else
{
print "failed";	
}
mysql_close($conn);
?>
