<?php
require_once('db.php');
$login = $_POST['login'];
$pass =  $_POST['pass'];
$repeatpass =  $_POST['repeatpass'];
$email = $_POST['email'];

if (empty($login) || empty($pass) || empty($repeatpass) || empty($email)) {
    echo "Заполните все поля";
} else {
    if ($pass != $repeatpass) {
        echo "Пароли не совпадают";
    } else {
        $sql = "INSERT INTO `users` (login,pass,email) VALUES ('$login', '$pass', '$email')";
        if ($conn -> query($sql)) {
            echo  "Регистрация выполнена"; 
            $sql = "ALTER TABLE `users` DROP id; 
            ALTER TABLE `users` ADD id BIGINT(200) NOT NULL 
            AUTO_INCREMENT FIRST, ADD PRIMARY KEY (id);";
            $conn -> multi_query($sql);
        } else {
            echo "Ошибка: " . $conn->error;
        }
    }
}