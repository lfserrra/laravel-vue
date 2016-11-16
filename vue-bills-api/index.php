<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$app = new Silex\Application();

function getBills($file = 'bills.json')
{
    $json = file_get_contents(__DIR__ . '/' . $file);
    $data = json_decode($json, true);
    return $data['bills'];
}

function findIndexById($id, $file = 'bills.json')
{
    $bills = getBills($file);
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBills($bills, $file = 'bills.json')
{
    $data = ['bills' => $bills];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/' . $file, $json);
}

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->get('api/bills', function () use ($app) {
    $bills = getBills();
    return $app->json($bills);
});

$app->get('api/bills/total', function () use ($app) {
    $bills = getBills();
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills/{id}', function ($id) use ($app) {
    $bills = getBills();
    $bill = $bills[findIndexById($id)];
    return $app->json($bill);
});

$app->post('api/bills', function (Request $request) use ($app) {
    $bills = getBills();
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills);
    return $app->json($data);
});

$app->put('api/bills/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills();
    $data = $request->request->all();
    $index = findIndexById($id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills);
    return $app->json($bills[$index]);
});

$app->delete('api/bills/{id}', function ($id) {
    $bills = getBills();
    $index = findIndexById($id);
    array_splice($bills,$index,1);
    writeBills($bills);
    return new Response("", 204);
});

$app->get('api/bills_receive', function () use ($app) {
    $bills = getBills('bills_receive.json');
    return $app->json($bills);
});

$app->get('api/bills_receive/total', function () use ($app) {
    $bills = getBills('bills_receive.json');
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills_receive/{id}', function ($id) use ($app) {
    $bills = getBills('bills_receive.json');
    $bill = $bills[findIndexById($id, 'bills_receive.json')];
    return $app->json($bill);
});

$app->post('api/bills_receive', function (Request $request) use ($app) {
    $bills = getBills('bills_receive.json');
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills, 'bills_receive.json');
    return $app->json($data);
});

$app->put('api/bills_receive/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills('bills_receive.json');
    $data = $request->request->all();
    $index = findIndexById($id, 'bills_receive.json');
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills, 'bills_receive.json');
    return $app->json($bills[$index]);
});

$app->delete('api/bills_receive/{id}', function ($id) {
    $bills = getBills('bills_receive.json');
    $index = findIndexById($id, 'bills_receive.json');
    array_splice($bills,$index,1);
    writeBills($bills, 'bills_receive.json');
    return new Response("", 204);
});

$app->match("{uri}", function($uri){
    return "OK";
})
->assert('uri', '.*')
->method("OPTIONS");


$app->run();