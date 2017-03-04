<?php
	
	$user=$_POST['user'];
	$password=$_POST['password'];
	$_SESSION['loggedin']=false;
	require 'includes/connectdb.php';
	$conn = connect();
  	$sql = "SELECT *  FROM login where userID = {$user} and password={$password}";
   
  	$retval = mysql_query( $sql, $conn );
  	if(! $retval )
 	 {
  	 	die('Could not get data: ' . mysql_error());
  	 }
	while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
  	{
		$_SESSION['loggedin'] = True;
  	} 
	print $_SESSION['loggedin'];
  	mysql_close($conn);
?>
