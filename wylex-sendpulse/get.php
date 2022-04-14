<?php
error_reporting(E_ERROR | E_PARSE);

include "Curl.php";
include "Helper.php";


$fechaInicio = date("Y-m-01");
$fechaFin = date("Y-m-t");

$publicKey = "86f1d5db-6fdf-41f8-8206-267d88f8b57c";
$privateKey = 'uH9AwqsWKKYPUalWuShcQA==';

$api = Curl::GetPage([
   "url" => "https://suscripciones.ecuavisa.com/api/v1/users?status=active&limit=5",
   "requestHeaders" => [
      "Authorization" => "Bearer wyleex+vistazo"
   ]
]);
$apiData = json_decode($api);
$apiData = $apiData->data;
echo count($apiData);
// var_dump($apiData);
$emails = arrayData($fechaInicio, $fechaFin);

foreach ($apiData as $key => $data) {
   $pos = strpos($data->email, "@facebook.com");
   if (!in_array($data->email, $emails) && $pos === false) {
      $username = explode("@", $data->email);
      $username = $username[0];

      $userEncription = [
         "usrname" => $username,
         "first_name"  => $data->first_name,
         "email" => $data->email
      ];

      $text = json_encode($userEncription);

      var_dump($text['first_name']);
   }
}
