<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With,Content-Type, Accept");
//header('Access-Control-Allow-Methods: GET, POST, PUT');
//header('Content-Type: application/json');

function debug($arg){
	echo '<div style="color: white; font-weight: bold; padding: 10px; background:#' . rand(111111, 999999) . '">';
	$trace = debug_backtrace(); // debug_backtrace me retourne des infos sur l'emplacement où est EXECUTER cette fonction. Nous retourne un array multidimentionnel.
	echo 'Le debug a été demandé dans le fichier : ' . $trace[0]['file'] . ' à la ligne : ' . $trace[0]['line'] . '<hr/>';

	echo '<pre>';
	print_r($arg);
	echo '</pre>';

	echo '</div>';
}
if(strtoupper($_SERVER['REQUEST_METHOD']) === 'POST'){
    $_POST =(array) json_decode(trim(file_get_contents('php://input'), true));
    //$_POST= json_decode(file_get_contents('php://input'), TRUE);

    $vitesse1 = $_POST['vitesse1'];
    $vitesse2 = $_POST['vitesse2'];
    $qcaloporteur1 =$_POST['qcaloporteur1'];
//foreach ($_POST as $temperature1) {

//}
//$vitesse1;
debug($_POST);
echo $vitesse1;
//echo json_encode($temperatures);



}

















?>
