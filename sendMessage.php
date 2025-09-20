<?php


include('database.php');

$env = parse_ini_file(__DIR__ . '/.env');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] === "POST") {

    // Retrieve the raw JSON data from the request body
    $json_data = file_get_contents('php://input');

    // Decode the JSON data into a PHP associative array
    $data = json_decode($json_data, true);

    // Check if JSON decoding was successful and data is not null
    if (json_last_error() !== JSON_ERROR_NONE || $data === null) {
        echo json_encode(['success' => false, 'message' => "Invalid JSON payload."]);
        exit;
    }
    

    $fullname = isset($data['fullname']) ? $data['fullname'] : '';
    $email = isset($data['email']) ? $data['email'] : '';
    $subject = isset($data['subject']) ? $data['subject'] : '';
    $message = isset($data['message']) ? $data['message'] : '';
    $recaptcha = isset($data['g-recaptcha-response']) ? $data['g-recaptcha-response'] : '';

    if (!$recaptcha) {
        echo json_encode(['success' => false, 'message' => "Please answer reCAPTCHA to proceed"]);
        exit;
    }

    // Verify reCAPTCHA with Google
    $secretKey = $env['RECAPTCHA_SECRET'];
    $verifyResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$recaptcha}");
    $responseData = json_decode($verifyResponse);

    if (!$responseData->success) {
        echo json_encode(['success' => false, 'message' => "reCAPTCHA verification failed"]);
        exit;
    }
    
    // Check for other empty fields
    if (empty($fullname) || empty($email) || empty($subject) || empty($message)) {
        echo json_encode(['success' => false, 'message' => "Please fill out all required fields."]);
        exit;
    }

    // Corrected the number of placeholders to match the number of variables
    $stmt = $conn->prepare("INSERT INTO message_tbl (client_name, client_email, subject, message) VALUES (?, ?, ?, ?)");
    
    // Corrected the bind_param to include the subject
    $stmt->bind_param("ssss", $fullname, $email, $subject, $message);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => "Thank you for messaging us! We will reach you out as soon as possible!"]);
    } else {
        echo json_encode(['success' => false, 'message' => "Something went wrong, please try again :<"]);
    }

    $stmt->close();
    $conn->close();
}
?>