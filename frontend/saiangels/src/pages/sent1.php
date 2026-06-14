<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Get data safely
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$mobile = $_POST['mobile'] ?? '';
$messageText = $_POST['message'] ?? '';

if(empty($name) || empty($email) || empty($mobile) || empty($messageText)){
    echo "error";
    exit;
}


// Email setup
$to = "principal.saiangelspucollege@gmail.com, prmanju89@gmail.com";
$subject = "Requirement Notification Mail for Sai Angels PU College";

$message = "
Name: $name
Email: $email
Mobile: $mobile
Message: $messageText
";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send mail
if(mail($to, $subject, $message, $headers)){
    echo "success";
} else {
    echo "error";
}
?>
