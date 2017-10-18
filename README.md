# test Websocket chat with bdd authentification

npm install --save ws<br>
npm install --save mysql<br>
<br>
db config : 
<p>
+----------------+
| Tables_in_test |
+----------------+
| chat           |
| user           |
+----------------+
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
