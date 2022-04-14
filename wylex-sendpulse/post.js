var url = "https://api.sendpulse.com/addressbooks/1156058/emails";

var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader(
  "Authorization",
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlkNzU4MTAzMzI0Mzg2ODA5Yjc3YTg2ZTM3ZGQyYjdkODU4ZWEzOTVkZWM0MmQ2M2Y4Yzk4ZDVlMGY0Y2Y3YjljNTEwNTE5YTJiOTI2NDY3In0.eyJhdWQiOiIyY2Q3MGYxMWE4NDI2ODU5MWVmYzNhZjY0ZGE0MWJhNSIsImp0aSI6IjlkNzU4MTAzMzI0Mzg2ODA5Yjc3YTg2ZTM3ZGQyYjdkODU4ZWEzOTVkZWM0MmQ2M2Y4Yzk4ZDVlMGY0Y2Y3YjljNTEwNTE5YTJiOTI2NDY3IiwiaWF0IjoxNjQ4MTM1NzQ0LCJuYmYiOjE2NDgxMzU3NDQsImV4cCI6MTY0ODEzOTM0NCwic3ViIjoiIiwic2NvcGVzIjpbXSwidXNlciI6eyJpZCI6NzM0NjUzMCwiZ3JvdXBfaWQiOm51bGwsInBhcmVudF9pZCI6bnVsbCwiYXJlYSI6InJlc3QifX0.NNP8RG4sFDkOnnwIHgI3zqdFq2kLlbvSRr_UMwN0oyH5TJMgz1dKISbd0REiOBfVRafSaOVze79aguY8vXwblgztl_c3JsuMumaJaaz_L2lBDj9CS_-DsnEbXda_zT7--FvN2AXQlxInoes6ZzPwvEXj3SqEYyLaXO6yi66kN7oKAo06PyfsfRdmqPaZiUualxGhxgpFwrShconMw4l3k0NeLyLFoD2BS-7ejZHcPcUmRiGOg3TueKvIIrax8JQgnOGZN84Z8QxJ8la8cnj-QEMb3vyfcAThi6_Q1Nd6OIpmo-wajOJVVeuixbr5RDrKkUL8zems2GrNmpsDUuqTMQ"
);
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    console.log(xhr.status);
    console.log(xhr.responseText);
  }
};

var data = `{
   "emails":["test3@test.com", "test4@test.com"]
}`;

xhr.send(data);
