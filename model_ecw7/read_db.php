<?php
/**
 * Created by Efrain-NoaYarasca
 * Date: 2/7/2019; Time: 9:46 PM
 * This code read the data from MySQL. The data is converted in JSON format to send to javascript code (g2.php)
 */

include ('data.php');//EE: Here, 'data.php' is not needed, because 'read_database.php' is also calling it

//This is a simple script that checks to see the session userID is even active. If not, that means someone is trying
// to access this page without loggin in and I throw them out.
/*session_set_cookie_params(3600);
session_start();
if ( $_SESSION['USERID']=="" ) {
    header('Location: login.php');
    }*/
// You can always override the session by just declaring it like I can do below if I wanted to test with userid=2.
$_SESSION['USERID']=111;
//$USERID = $_SESSION['USERID'];
$USERID = 111;

/*  Old connection
// E: This code tries to connect to the server. Arguments are called from 'data.php' included above in L-103.
//For LOCAL-HOST
//$connection = mysqli_connect (DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME, 3306)
//For OSU-SERVER
//$connection = mysqli_connect (DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME, 3307)
//or die("Unable to connect to server<br>\n");
//echo "Connected to database!<br><br>";*/

// ------------
$host = $_SERVER['HTTP_HOST'];
if ($host == 'localhost') {//E: For localhost
    $servername = DB_SERVER1; $username = DB_USER1; $password = DB_PASSWORD1; $dbname = DB_NAME1; $port = PORT1;
}
else {//E: For OSU Server  E: elseif for more servers
    $servername = DB_SERVER2; $username = DB_USER2; $password = DB_PASSWORD2; $dbname = DB_NAME2; $port = PORT2;
}

// Create connection
$connection = new mysqli($servername, $username, $password, $dbname, $port);
// Check connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}
// ----------------------
$count = 0;

//E: Grabbing the massive amount of data from 'takefeedback' table. I actually am going to write it out on the
// page in a table.
//$query2 =("SELECT * FROM takefeedback where USERID = '$USERID'");//E: DB for "ecw"
//$query2 =("SELECT * FROM takefeedback2 where USERID = '$USERID'");//E: DB for "ecw"
//$query2 =("SELECT * FROM takefeedback3 where USERID = '$USERID'");//E: DB for "ecw" diff error bars
//$query2 =("SELECT * FROM takefeedback4 where USERID = '$USERID'");//E: DB for "ecw" diff error bars
//$query2 =("SELECT * FROM tkb3 where USERID = '$USERID'");//E: DB for "ecw" diff error bars
// $query2 =("SELECT * FROM tkb3c where USERID = '$USERID'");//E: "tkb3c" DB does not consider error values
$query2 =("SELECT * FROM tkb3d where USERID = '$USERID'");//E: "tkb3d" DB is for experiment with barplot at left side
//$query =("SELECT * FROM dmk_db1 where USERID = '$USERID'");//E: DB for Dairy-Mckay
$result2 = mysqli_query($connection, $query2); //  ???
$jsonn_array = array();
$ccc = 0;

while($row2 = mysqli_fetch_assoc($result2) ){
    //    echo count($row2);
    //    $row2['ID'] =  "$ccc";//Get ID as string
    $row2['ID'] =  $ccc;//Get ID as number

    //E: These lines sort the array. From the end, ID is moved to the beginning
    $lastvalue_inrow = end($row2);
    $lastkey_inrow = key($row2);
    $arr_aux1 = array($lastkey_inrow => $lastvalue_inrow);
    array_pop($row2);
//    print_r ($lastkey_inrow); print_r ($lastvalue_inrow); print_r ($arr_aux1);

    $row2_sort = array_merge($arr_aux1,$row2);
//        print_r ($row2_sort);//print_r (key($row2));

    $jsonn_array[] = $row2_sort;
    $ccc ++;
}

//E: These lines encode the 'json_array', created in PHP, to be ready to send to javascript as variable
echo '<script>';
echo 'var json_from_mysql = ' . json_encode($jsonn_array) . ';';
echo '</script>';

?>
