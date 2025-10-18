<?php
function encrypt_decrypt($action, $algo, $key, $iv, $data) {
    switch (strtolower($algo)) {
        case 'aes': $cipher = 'AES-256-CBC'; break;
        case 'des': $cipher = 'DES-CBC'; break;
        case 'rc4': $cipher = 'RC4'; break;
        default: return "Unsupported algorithm.";
    }

    if ($action === 'encrypt') {
        $encrypted = openssl_encrypt($data, $cipher, $key, OPENSSL_RAW_DATA, $iv ?: "");
        return base64_encode($encrypted);
    } else {
        $decoded = base64_decode($data);
        return openssl_decrypt($decoded, $cipher, $key, OPENSSL_RAW_DATA, $iv ?: "");
    }
}

// --- Handle form input ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $algo = $_POST['algo'];
    $key = $_POST['key'];
    $iv = $_POST['iv'];
    $action = $_POST['action'];
    $type = $_POST['type'];

    // Pastikan folder output ada
    if (!file_exists('enc')) mkdir('enc', 0777, true);
    if (!file_exists('dec')) mkdir('dec', 0777, true);

    if ($type === 'text') {
        $inputText = $_POST['text'];
        $output = encrypt_decrypt($action, $algo, $key, $iv, $inputText);

        echo "<h2>Result ($algo - $action)</h2>";
        echo "<pre>" . htmlspecialchars($output) . "</pre>";
        echo "<a href='index.html'>← Back</a>";

    } elseif ($type === 'file' && isset($_FILES['file']['tmp_name'])) {
        $inputFile = $_FILES['file']['tmp_name'];
        $filename = basename($_FILES['file']['name']);
        $data = file_get_contents($inputFile);

        if ($action === 'encrypt') {
            // Simpan hasil enkripsi ke folder enc/
            $result = encrypt_decrypt('encrypt', $algo, $key, $iv, $data);
            $outputName = "enc/" . $filename;
            file_put_contents($outputName, $result);

            echo "<h2>File Encrypted ($algo)</h2>";
            echo "<p>Saved to: <strong>$outputName</strong></p>";
            echo "<a href='$outputName' download>Download File</a><br>";
            echo "<a href='index.html'>← Back</a>";

        } else {
            // Simpan hasil dekripsi ke folder dec/
            $result = encrypt_decrypt('decrypt', $algo, $key, $iv, $data);
            $outputName = "dec/" . $filename;
            file_put_contents($outputName, $result);

            echo "<h2>File Decrypted ($algo)</h2>";
            echo "<p>Saved to: <strong>$outputName</strong></p>";
            echo "<a href='$outputName' download>Download File</a><br>";
            echo "<a href='index.html'>← Back</a>";
        }

    } else {
        echo "No input provided.";
    }
}
?>
