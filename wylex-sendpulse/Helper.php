<?php

function encrypt($text, $publicKey, $privateKey){ 
    $ivSize = openssl_cipher_iv_length('aes-128-cbc');

    $iv = base64_decode($privateKey);

    $encrypted = openssl_encrypt($text, 'aes-128-cbc', base64_decode($privateKey), OPENSSL_RAW_DATA, $iv);

    return base64_encode($encrypted);
} 

function arrayData($fechaInicio, $fechaFin, $pag = "vistazo"){
    $file = __DIR__ . "/".$pag."-data-".$fechaInicio.$fechaFin.".txt";
    $lines = [];
    if(file_exists($file)){
        $lines = file($file, FILE_IGNORE_NEW_LINES);
    }
    return $lines; 
}

function fileData($email, $fechaInicio, $fechaFin, $pag = "vistazo"){
    $file = __DIR__ . "/".$pag."-data-".$fechaInicio.$fechaFin.".txt";
    if(!file_exists($file)){
        $fp = fopen($file ,"wb");
        fwrite($fp, $email);
        fclose($fp);
    }else{
        file_put_contents($file, $email.PHP_EOL, FILE_APPEND);
    }
}