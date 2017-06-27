<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$tee = $request->tee;
$tec = $request->tec;

$pdo = new PDO('mysql:host=localhost;dbname=echangeur_thermique', 'root',  'Novembre', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));



$resultat = $pdo -> query("INSERT INTO temperature(id_temperature, tee, tec )  VALUES ('','$tee' ,'$tec' )");

        




?>
