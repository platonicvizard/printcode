<?php
header( 'Content-type: text/html; charset=utf-8' );

/** * Copyright 2015 Lisandro Martinez  */

/*At some point I had a 403 error. accordingly this error could have something to do
with the request time or the url format. TODO: look into it.*/

require_once 'tools.php';
require_once 'WindowsAzure/WindowsAzure.php';
require_once 'Connection.php';

use WindowsAzure\Common\ServicesBuilder;
use WindowsAzure\Common\ServiceException;
use WindowsAzure\Blob\Models\Block;
use WindowsAzure\Blob\Models\CreateContainerOptions;
use WindowsAzure\Blob\Models\ListContainersOptions;
use WindowsAzure\Blob\Models\ListBlobsOptions;
use WindowsAzure\Blob\Models\PublicAccessType;

define("DEFAULT_CONTAINER","dfltcntr");

if(isset($_FILES["s_file"])){
    $file = $_FILES["s_file"];
} else {
    error("No file found.");
}

$block_name = $file["name"];

//if there is an account id to upload then change the container otherwise use a default 
//container name and add the code to a sub folder

$container = isset($_POST["accnt_id"])?$_POST["accnt_id"]:DEFAULT_CONTAINER;
//generate the code for this file
$doc_code = makeRandomString();    
$remove_action = isset($_POST["remove_action"])?$_POST["remove_action"]:"1";
$remove_access_times =  isset($_POST["remove_access_times"])?$_POST["remove_access_times"]:"1";
$remove_hours =  isset($_POST["remove_hours"])?$_POST["remove_hours"]:"1";

try {
   
    $blobRestProxy = ServicesBuilder::getInstance()->createBlobService($connectionString);
   
    //createContainerIfNotExists($blobRestProxy);
    $listContainersOptions = new ListContainersOptions;
    $listContainersOptions->setPrefix($container);
    //$listContainersResult = $blobRestProxy->listContainers($listContainersOptions);
    //$containerExists = false;
    // $containers = $listContainersResult->getContainers();
    // for($i = 0; $i < $containers.length; $i++){
    // print_r($containers[$i]);
    // }
    //foreach ($listContainersResult->getContainers() as $container) {
       
    //    if ($container->getName() == $container) {
    //        $containerExists = true;// The container exists.
    //        // No need to keep checking.
    //        break;
    //    }
    //}
    
    $createContainerOptions = new CreateContainerOptions();
        //$createContainerOptions->setPublicAccess(PublicAccessType::CONTAINER_AND_BLOBS);
        //$blobRestProxy->addSignedIdentifier("uniqueid",time()+ 500,"r");
        $createContainerOptions->addMetaData("remove_action", $remove_action);
        $createContainerOptions->addMetaData("remove_access_times", $remove_access_times);
        $createContainerOptions->addMetaData("remove_hours", $remove_hours);
        
        try{
            
            $blobRestProxy->createContainer($container, $createContainerOptions);
        } catch(Exception $e){
            $code = $e->getCode();// http://msdn.microsoft.com/library/azure/dd179439.aspx
            $error_message = $e->getMessage();
            if($code == 409){//The container already exist
                //error( $code.": ".$error_message); //uncomment this line for testing and to see code value and message
            }
        }
        
    $blob_content = file_get_contents($file['tmp_name']);//"$doc_code/$block_name"
    $blobRestProxy->createBlockBlob($container,"$doc_code/$block_name", $blob_content);
    
//error(print_r($blobs));
    //foreach($blobs as $blob)
    //{
    //    echo $blob->getName().": ".$blob->getUrl()."<br />";
    //}
    
    success('File uploaded',',"accesscode":"'.$doc_code.'"');
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

