# test Websocket chat with bdd authentification

npm install --save ws<br>
npm install --save mysql<br>
<br>
db config : 
<p>
+----------------+<br>
| Tables_in_test |<br>
+----------------+<br>
| chat           |<br>
| user           |<br>
+----------------+<br>
</p>
table 'chat' :<br>
+---------+---------+------+-----+---------+----------------+<br>
| Field   | Type    | Null | Key | Default | Extra          |<br>
+---------+---------+------+-----+---------+----------------+<br>
| ID      | int(11) | NO   | PRI | NULL    | auto_increment |<br>
| user    | text    | YES  |     | NULL    |                |<br>
| Message | text    | NO   |     | NULL    |                |<br>
+---------+---------+------+-----+---------+----------------+<br>
<br>
table 'user' : <br>
+-------+---------+------+-----+---------+----------------+<br>
| Field | Type    | Null | Key | Default | Extra          |<br>
+-------+---------+------+-----+---------+----------------+<br>
| ID    | int(11) | NO   | PRI | NULL    | auto_increment |<br>
| user  | text    | NO   |     | NULL    |                |<br>
| pass  | text    | NO   |     | NULL    |                |<br>
+-------+---------+------+-----+---------+----------------+<br>
