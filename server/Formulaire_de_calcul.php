<?php

$pdo = new PDO('mysql:host=localhost;dbname=echangeur_thermique', 'root',  'Novembre', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));



$resultat = $pdo -> query("INSERT INTO temperature(id_temperature, tee, tec )  VALUES ('','$tee' ,'$tec' )");

        




?>
