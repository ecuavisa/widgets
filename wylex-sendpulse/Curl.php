<?php
class Curl{
    public static function GetPage($obj){
        $link = isset($obj['url'])?$obj['url']:NULL;
        $useheader = isset($obj['showHeader'])?$obj['showHeader']:NULL;
        $useragent = isset($obj['agent'])?$obj['agent']:NULL;
        $referer = isset($obj['referer'])?$obj['referer']:NULL;
        $custheader = isset($obj['requestHeaders'])?$obj['requestHeaders']:NULL;
        $cookie = isset($obj['cookie'])?$obj['cookie']:NULL;
        $encoding = isset($obj['encoding'])?$obj['encoding']:NULL;
        $mpostfield = isset($obj['data'])?$obj['data']:NULL;
        $sslverify = isset($obj['sslverify'])?$obj['sslverify']:NULL;
        $nobody = isset($obj['nobody'])?$obj['nobody']:NULL;
        $ipv6 = isset($obj['ipv6'])?$obj['ipv6']:NULL;
        $method = isset($obj['method'])?$obj['method']:NULL;
        $location = isset($obj['location']) ? $obj['location'] : NULL;
        $usehttpheader = true;
        $mpost = false;
        if($method=="POST"){
            $mpost = true;
        }
        if(!$useragent || $useragent==""){
            $useragent = @$_SERVER['HTTP_USER_AGENT'];
        }
        if($mpostfield){
            $arrd = array();
            foreach($mpostfield as $key => $value){
                $arrd[] = $key."=".$value;
            }
            $mpostfield = implode("&",$arrd);
        }
        $curl = curl_init();
        $header[0] = "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
        $header[] = "Accept-Language: en-us,en;q=0.5";
        $header[] = "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7";
        $header[] = "Keep-Alive: 115";
        $header[] = "Connection: keep-alive";
        if($custheader){
            foreach($custheader as $key => $value){
                $header[] = $key.": ".$value;
            }
        }
        
        curl_setopt($curl, CURLOPT_URL, $link);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        if($useheader){curl_setopt($curl, CURLOPT_HEADER, 1);}
        if($useragent!=""){curl_setopt($curl, CURLOPT_USERAGENT, $useragent);}
        if($usehttpheader){curl_setopt($curl, CURLOPT_HTTPHEADER, $header);}
        if($cookie!=""){
            if ($cookie && is_array($cookie)) {
                if (count($cookie) > 0) {
                    $cookies = '';
                    foreach ($cookie as $k => $v) $cookies .= "$k=$v; ";
                    $cookie = substr($cookies, 0, -2);
                    unset($cookies);
                } else $cookie = 0;
            }
            curl_setopt($curl, CURLOPT_COOKIE, str_replace('\\"','"',$cookie));
        }
        if ($location) {curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);}
        if($referer!=""){curl_setopt($curl, CURLOPT_REFERER, $referer);}
        if($encoding!=""){curl_setopt($curl, CURLOPT_ENCODING, $encoding);}
        if($mpost){curl_setopt($curl, CURLOPT_POST, 1);}
        if($mpostfield!=""){curl_setopt($curl, CURLOPT_POSTFIELDS, $mpostfield);}
        if($nobody){curl_setopt($curl, CURLOPT_NOBODY, 1);}
        if($ipv6){curl_setopt($curl, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V6);}
        if($sslverify){
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); 
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
        }
    
        $result = curl_exec($curl);
        curl_close($curl);
        return $result;
    }
}