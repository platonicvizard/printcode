<?php
header( 'Content-type: text/html; charset=utf-8' );

/** * Copyright 2015 Lisandro Martinez  */

/*At some point I had a 403 error. accordingly this error could have something to do
with the request time or the url format. TODO: look into it.*/

require_once 'tools.php';
require_once 'WindowsAzure/WindowsAzure.php';
require_once 'Connection.php';

use WindowsAzure\Common\ServiceException;
use WindowsAzure\Blob\Models\ListContainersOptions;
use WindowsAzure\Blob\Models\ListBlobsOptions;
//use WindowsAzure\Blob\Models\PublicAccessType;

define("DEFAULT_CONTAINER","dfltcntr");

//if there is an account id to upload then change the container otherwise use a default 
//container name and add the code to a sub folder
$account_id_is_set = isset($_POST["accnt_id"]);

$container = $account_id_is_set && !empty($_POST["accnt_id"])?$_POST["accnt_id"]:DEFAULT_CONTAINER;

//generate the code for this file
$doc_code = "";

if(!isset($_POST["dc_id"])){
    //then the account id must be set in order to get a list of the files to print
    if(!$account_id_is_set){
        error("Account or Document code not set.");
    }
} else{
    $doc_code = $_POST["dc_id"];
}

//$remove_action = isset($_POST["remove_action"])?$_POST["remove_action"]:"1";
//$remove_access_times =  isset($_POST["remove_access_times"])?$_POST["remove_access_times"]:"1";
//$remove_hours =  isset($_POST["remove_hours"])?$_POST["remove_hours"]:"1";

try {
     sleep(60);
    //createContainerIfNotExists($blobRestProxy);
    $listContainersOptions = new ListContainersOptions;
    $listContainersOptions->setPrefix($container);
    
    $arr = [];
    $blob_list = null;
    $op = new ListBlobsOptions;
   
    //if the user did not pass the document code, list all the files withing the container
    //because that is the list of files for that account
    if($doc_code == ""){
        $blob_list = $blobRestProxy->listBlobs($container);       
    } else {
       
        $op->setPrefix("$doc_code/");
        // List blobs.
        $blob_list = $blobRestProxy->listBlobs($container,$op);       
    }
    
    //print_r($blob_list->getBlobs());
    $blobs = $blob_list->getBlobs();
    
    //$i = 0;
    foreach($blobs as $blob)
    { 
        $blobRestProxy->deleteBlob($container,$blob->getName());
    
       // $arr[$i] = ["name"=>basename($blob->getName()), "url"=>$blob->getUrl()]; 
       // $i++;
    }
    success('File deleted',"");
}

catch(ServiceException $serviceException)
{
    $code = $serviceException->getCode();
    $error_message = $serviceException->getMessage();
    error("ServiceException encountered.\n$code: $error_message");
}
catch (Exception $exception) 
{
    $code = $exception->getCode();
    $error_message = $exception->getMessage();
    error("Exception encountered.\n$code: $error_message");
}

?>

