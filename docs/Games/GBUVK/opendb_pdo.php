<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
	</head>
	<body>
	<?php
		//PDO mysql driver
		//Syntax: $pdo = new PDO("mysql:host=localhost;dbname=database", 'username', 'password');

		//Connet to database
		$pdo = new PDO("mysql:host=localhost;dbname=bts", 'root', '');
		$executution_of_query = false;

		//Add a row to table when putt insert=<name> in url. 
		//No thoughts of security whatsoever
		if (isset($_GET['insert'])) {
			/* 
			Should be a value from a form. 
			
			When having method="POST" in form, the value is fetched
			with $_POST[<name of formelement>]
			
			When having method="GET" in form, the value is fetched
			with $_GET[<name of formelement>]
			*/
			$ertapp = $_GET['insert'];
			$sql = "INSERT INTO ertapp (ertapp) VALUES('{$ertapp}')";

			//If you have more columns you should define them separated by a comma
			//If you have 2 columns, you must have values. If you have 3 columns
			//you must have 3 values etc.
			
			$executution_of_query = true;
		}

		//Do the actual query to the database
		//(this query must be done before outputting html
		//based on values from this table)
		if ($executution_of_query === true) {
			$pdo->query($sql); //Look into $pdo->execute for security
		}

		//Create query for selecting all rows from table ertapp
		$sql = 'SELECT * FROM ertapp';
		$query = $pdo->query($sql);

		//Return result in an associative array 
		//"Normal array" = array(0 => 'value1', 1 => 'value2' etc)
		//Associative array = array('name1' => 'value1', 'name2' => 'value2' etc)
		$result = $query->fetchall(PDO::FETCH_ASSOC);

		//Show all rows from table ertapp
		$query = $pdo->query($sql);
		$result = $query->fetchall(PDO::FETCH_ASSOC);//Associative array.

		//Loop through result and output it as html
		foreach($result as $r) {
			echo $r['Ertapp'] . '<br>';
		}
		echo '<hr>';

		//All rows with UTF8 (new database connection)
		$pdo = new PDO("mysql:host=localhost;charset=utf8;dbname=bts", 'root', '');
		//Show all rows from table ertapp
		$query = $pdo->query($sql);
		$result = $query->fetchall(PDO::FETCH_ASSOC);
		foreach($result as $r) {
			echo $r['Ertapp'] . '<br>';
		}

		echo '<hr>';

		?>
	</body>
</html>