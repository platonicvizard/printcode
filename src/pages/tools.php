 <?php
     function cleanOutput(){
      ob_start();
        echo 'clean the output buffer.';
      ob_end_clean();
    }
    function error($message){
        echo '{"error":"'.$message.'"}';
        exit();
    
    }
    function info($message){
        echo'{"info":"'.$message.'"}';
    }
    //function success($message,$data = ""){
    //    echo'{"success":"'.$message.'"'.$data.'}';
    //}
    
     function success($message,$data){
        echo'{"success":"'.$message.'"'.$data.'}';
    }
   
   function makeRandomString($max=11,$extended=false) {
        $i = 0; 
        $possible_keys = "01234567890123456789abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
        if($extended) $possible_keys = "_________".$possible_keys."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_________";
        $keys_length = strlen($possible_keys);
        
        $str = "";
        while($i<$max) {
    	    $rand = mt_rand(1,$keys_length-1);
    	    $str.= $possible_keys[$rand];
    	    $i++;
        }
        return $str;
    }
    
    function generateSasToken($uri, $sasKeyName, $sasKeyValue) 
    { 
        $targetUri = strtolower(rawurlencode(strtolower($uri))); 
        $expires = time();  
        $expiresInMins = 60; 
        $week = 60*60*24*7;
        $expires = $expires + $week; 
        $toSign = $targetUri . "\n" . $expires; 
        $signature = rawurlencode(base64_encode(hash_hmac('sha256',             
         $toSign, $sasKeyValue, TRUE))); 

        $token = "SharedAccessSignature sr=" . $targetUri . "&sig=" . $signature . "&se=" . $expires .      "&skn=" . $sasKeyName; 
        return $token; 
    }
    
    //function createContainerIfNotExists($blobRestProxy)
//{
// error($container);
//    // See if the container already exists.
//    $listContainersOptions = new ListContainersOptions;
//    error($container);
//    $listContainersOptions->setPrefix($container);
//    $listContainersResult = $blobRestProxy->listContainers($listContainersOptions);
//    $containerExists = false;
//    foreach ($listContainersResult->getContainers() as $container)
//    {
//        if ($container->getName() == $container)
//        {
//            // The container exists.
//            $containerExists = true;
//            // No need to keep checking.
//            break;
//        }
//    }
//    if (!$containerExists)
//    {
//        $blobRestProxy->createContainer($container);
//        info("Creating container.\nContainer '" . $container . "' successfully created.\n");
//    }
//}
    
 ?>