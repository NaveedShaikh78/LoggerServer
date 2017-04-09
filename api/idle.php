<?php
require 'includes/connectdb.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
print("\n");
$conn = connect();
$id=$_POST['id'];
$rtype=$_POST['rtype'];
$idlename=$_POST['idlename'];
$idledesc=$_POST['idledesc'];
if($rtype=="getData")
{
  $sql="select * from idle";
}
elseif ($rtype == "insertData")
{
    $sql = "insert into idle(idlename,idledesc) values('$idlename','$idledesc')";
}
elseif ($rtype == "updateData")
{
    $sql = "update idle set idlename='$idlename',idledesc='$idledesc' where id ='$id'";
}
elseif ($rtype == "deleteData")
{
    $sql = "delete from idle where id ='$id'";
}
$retval = mysql_query( $sql, $conn );

  if(! $retval )
  {
    print json_encode([$sql]);
    die('');
  }
$rows=[];
while($row = mysql_fetch_array($retval, MYSQL_ASSOC))
  {
  $rows[] = $row;
  }
  if ($rtype == "insertData")
  {
      print json_encode([mysql_insert_id()]);
      return;
  }
mysql_close($conn);
print json_encode($rows);
return;
?>
