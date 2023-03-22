<?php

  $conn = mysqli_connect("localhost","root","","bill_receipt");

  //check connection
  if(mysqli_connect_errno()) {
    echo "Failed to connect to Mysql : ".mysqli_connect_error();
    exit();
  }


?>