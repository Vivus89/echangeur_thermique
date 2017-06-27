<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With,Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
header('Content-Type: application/json');

function debug($arg){
	echo '<div style="color: white; font-weight: bold; padding: 10px; background:#' . rand(111111, 999999) . '">';
	$trace = debug_backtrace(); // debug_backtrace me retourne des infos sur l'emplacement où est EXECUTER cette fonction. Nous retourne un array multidimentionnel.
	echo 'Le debug a été demandé dans le fichier : ' . $trace[0]['file'] . ' à la ligne : ' . $trace[0]['line'] . '<hr/>';

	echo '<pre>';
	print_r($arg);
	echo '</pre>';

	echo '</div>';
}

if ($_SERVER['REQUEST_METHOD'] == 'POST'){

$request = json_decode(file_get_contents('php://input'), TRUE);

$temperature = $request['temperature'];
$id_temperature = $request['id_temperature'];
$tee = $request['tee'];
$tec = $request['tec'];

$pdo = new PDO('mysql:host=localhost;dbname=echangeur_thermique', 'root',  'Novembre', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));




$row= 1;

if (($temperature = fopen("temperature.csv", "r")) !== FALSE) // Ouvre le fichier en lecture si il existe

    {

    while (($data = fgetcsv($temperature, 1000, ";", "\n")) !== FALSE) // tant que le fichier est populé, exécuter les instructions ci dessus (le                                                      séparateur csv est ; (au choix)

        {
$num= count($data);
$row++;
for($c=0; $c<$num ;$c++){
             $tee = $data[0];// Place l'enregistrement du champs zéro du fichier CSV dans la var $ville

            $tec = $data[1]; // place l'enregistrement du champs 1 du fichier CSV dans la var $email

											}
//debug($tee);
$resultat = $pdo -> query("INSERT INTO temperature (id_temperature, tee, tec )  VALUES ('','$tee' ,'$tec' )");

        }

			}



		}



?>
