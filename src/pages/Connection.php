<?php
header( 'Content-type: text/html; charset=utf-8' );

/** * Copyright 2015 Lisandro Martinez  */

/*At some point I had a 403 error. accordingly this error could have something to do
with the request time or the url format. TODO: look into it.*/

require_once 'tools.php';
require_once 'WindowsAzure/WindowsAzure.php';

use WindowsAzure\Common\ServicesBuilder;
use WindowsAzure\Common\ServiceException;
use WindowsAzure\Common\CloudConfigurationManager;

try {
         
    //use for local connections
    //$connectionString = CloudConfigurationManager::getConnectionString("StorageConnectionString");
    //deploy connection comes from .htaccess and on 1and1 share hosting the prefix REDIRECT_ gets added.
    $connectionString = CloudConfigurationManager::getConnectionString("REDIRECT_StorageConnectionString");
    
    if (null == $connectionString || "" == $connectionString) {
        error("Did not find a connection string.");
    }
     
    $blobRestProxy = ServicesBuilder::getInstance()->createBlobService($connectionString);
   
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

