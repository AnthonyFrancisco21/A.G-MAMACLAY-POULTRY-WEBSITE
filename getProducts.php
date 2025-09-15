<?php
include("database.php");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$category = isset($_GET['category']) ? $_GET['category'] : '';
$name     = isset($_GET['name']) ? $_GET['name'] : '';

// No filters
if ($category === '' && $name === '') {
    $sql = "SELECT * FROM product_tbl WHERE is_deleted = 0";
    $stmt = $conn->prepare($sql);

// Only category
} elseif ($category !== '' && $name === '') {
    $sql = "SELECT * FROM product_tbl WHERE categories = ? AND is_deleted = 0";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $category);

// Only name
} elseif ($category === '' && $name !== '') {
    $sql = "SELECT * FROM product_tbl WHERE is_deleted = 0 AND product_name LIKE ?";
    $stmt = $conn->prepare($sql);
    $like = "%{$name}%";
    $stmt->bind_param("s", $like);

// Both category and name
} else {
    $sql = "SELECT * FROM product_tbl 
            WHERE categories = ? AND is_deleted = 0 AND product_name LIKE ?";
    $stmt = $conn->prepare($sql);
    $like = "%{$name}%";
    $stmt->bind_param("ss", $category, $like);
}

$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode(["data" => $data]);
$conn->close();
