<?php
header('Content-Type: text/plain; charset=utf-8');
try {
    
        // Undefined | Multiple Files | $_FILES Corruption Attack
        // If this request falls under any of them, treat it invalid.
        if (!isset($_FILES['s_file']['error']) || is_array($_FILES['s_file']['error'])) {
            throw new RuntimeException('Invalid parameters.');
        }
        // Check $_FILES['s_file']['error'] value.
        switch ($_FILES['s_file']['error']) {
            case UPLOAD_ERR_OK:
                break;
            case UPLOAD_ERR_NO_FILE:
                throw new RuntimeException('No file sent.');
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                throw new RuntimeException('Exceeded filesize limit.');
            default:
                throw new RuntimeException('Unknown errors.');
        }
    
        // You should also check filesize here. 
        if ($_FILES['s_file']['size'] > 1000000) {
            throw new RuntimeException('Exceeded filesize limit.');
        }
        // DO NOT TRUST $_FILES['s_file']['mime'] VALUE !!
        // Check MIME Type
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        if (false === $ext = array_search($finfo->file($_FILES['s_file']['tmp_name']),
        array(
            'jpg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
            'pdf' => 'application/pdf',
            'doc' => 'application/doc',
            'docx' => 'application/docx',
            'docm' => 'application/docm',
            'dot' => 'application/dot',
            'dotx' => 'application/dotx',
            'bmp' => 'image/bmp',
            'xml' => 'application/xml',
            'xls' => 'application/xls',
            'xlsx' => 'application/xlsx',
        ),	true)) {
            throw new RuntimeException('Invalid file format.');
        }
        // Obtain safe unique name from its binary data.
        if (!move_uploaded_file($_FILES['s_file']['tmp_name'], sprintf('./uploads/%s.%s', sha1_file($_FILES['s_file']['tmp_name']), $ext ))) {
            throw new RuntimeException('Failed to move uploaded file.');
        }
        echo 'File is uploaded successfully.';

    } catch (RuntimeException $e) {
        echo $e->getMessage();
}
?>