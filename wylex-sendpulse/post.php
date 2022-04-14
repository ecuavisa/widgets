<?php

$url = "https://api.sendpulse.com/addressbooks/1156058/emails";

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$headers = array(
   "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImUyNmY0MWQyMGE0ZmM0MjRhYTkzZmNlMTMxYjUyNjk3YmE5NmY0ZGJmMGExZmY4YTM1NjVmZTQzODc0N2QwNjY5NjZhYjgzNjVlMzIzZTRjIn0.eyJhdWQiOiIyY2Q3MGYxMWE4NDI2ODU5MWVmYzNhZjY0ZGE0MWJhNSIsImp0aSI6ImUyNmY0MWQyMGE0ZmM0MjRhYTkzZmNlMTMxYjUyNjk3YmE5NmY0ZGJmMGExZmY4YTM1NjVmZTQzODc0N2QwNjY5NjZhYjgzNjVlMzIzZTRjIiwiaWF0IjoxNjQ4MTUyMjIxLCJuYmYiOjE2NDgxNTIyMjEsImV4cCI6MTY0ODE1NTgyMSwic3ViIjoiIiwic2NvcGVzIjpbXSwidXNlciI6eyJpZCI6NzM0NjUzMCwiZ3JvdXBfaWQiOm51bGwsInBhcmVudF9pZCI6bnVsbCwiYXJlYSI6InJlc3QifX0.knZKmFF-DslA-YiVk-5Y1r5BqGq9TknrYPRlh1g2ywV0O6bzS2Yu7eQSyDl-D9nkFL3sMj9VI7NxfoNqLVeM-IoXPZjeh7tdugUqlYNMfp00eCKFMODF8yWUAxrpN8bLU8eDDq-nAtrfIRkY-MHbE7FueVf5ErhD0FdBV2yp10UbsIrURwmyatZvYjx89oTmamlu7pKqFSnoNxhUI__HlSYglxhUqIs8-J3Ey1oAmFSvNIcsLJyUlDosut1nIscP9A3jXhGlOpClbnC1r9oEPvWLjtZf3nhUBc576Dh7NylRmLSmJnuhu-ulr4o3W7qRLybVkqVSCEJ_choWpz35AQ",
   "Content-Type: application/json",
);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

$data = <<<DATA
{
   "emails":["test300@test.com", "test301@test.com"]
}
DATA;

curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

//for debug only!
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

$resp = curl_exec($curl);
curl_close($curl);
var_dump($resp);

?>

