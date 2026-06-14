<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Get data safely
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$mobile = $_POST['mobile'] ?? '';
$address = $_POST['address'] ?? '';
$course = $_POST['course'] ?? '';
$messageText = $_POST['message'] ?? '';

if(empty($name) || empty($email) || empty($mobile) || empty($address) || empty($course) || empty($messageText)){
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
Address: $address
Course: $course
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
