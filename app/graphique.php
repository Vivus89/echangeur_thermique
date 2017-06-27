<?php
header('Access-Control-Allow-Origin: *');
/*header("Access-Control-Allow-Headers: Origin, X-Requested-With,Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
header('Content-Type: application/json');*/

function debug($arg){
	echo '<div style="color: white; font-weight: bold; padding: 10px; background:#' . rand(111111, 999999) . '">';
	$trace = debug_backtrace(); // debug_backtrace me retourne des infos sur l'emplacement où est EXECUTER cette fonction. Nous retourne un array multidimentionnel.
	echo 'Le debug a été demandé dans le fichier : ' . $trace[0]['file'] . ' à la ligne : ' . $trace[0]['line'] . '<hr/>';

	echo '<pre>';
	print_r($arg);
	echo '</pre>';

	echo '</div>';
}



$request = json_decode(file_get_contents('php://input'), TRUE);

$temperature = $request['temperature'];
$id_temperature = $request['id_temperature'];
$tee = $request['tee'];
$tec = $request['tec'];

$pdo = new PDO('mysql:host=localhost;dbname=echangeur_thermique', 'root',  'Novembre', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));





$temperature = $pdo -> query("SELECT * FROM temperature");

$temperatures1 = $temperature->fetchAll(PDO::FETCH_ASSOC);
//echo $temperature1s;

    foreach ($temperatures1 as $temperature1) {

         $temperatures[] = [


           'id_temperature' => $temperature1["id_temperature"],
           'tee' => $temperature1["tee"],
       		'tec'=> $temperature1["tec"]
         ];


     }


		 echo json_encode($temperatures);

/*
$massevolumique = 1000;
$viscositeeffluent = 0.001;
$conductiviteeffluent= 0.6;
$capacitecalorifique= 4.186;
$Qeffluent =$request['Q_effluent'];
$sm = $request['smouilleeffluent'];
$Dmeffluent= $request['Dm_effluent'];
$reynoldseffluents= $request['Reynolds_effluent'];
$Preffluent= $request['Pr_effluent'];
$Pm = $request['Pm_effluent'];
$lc =$request['lc'];
$peclet = $request['Peclets_effluent'];

$reynoldseffluents = ($massevolumique * $request['Rh_effluent']*$Qeffluent)/($sm * $viscositeeffluent);
$Preffluent= ($viscositeeffluent * $capacitecalorifique)/($conductiviteeffluent * 1000);
$Pm = 2* 3.14 * $Dmeffluent /2;
$lc = 4* ($sm/$Pm);
$peclet = $reynoldseffluents * $Preffluent;*/




//echo json_encode($resultat);


?>
