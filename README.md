# test Websocket chat with bdd authentification

npm install --save ws
npm install --save mysql

db config : 

+----------------+
| Tables_in_test |
+----------------+
| chat           |
| user           |
+----------------+

table 'chat' :
+---------+---------+------+-----+---------+----------------+
| Field   | Type    | Null | Key | Default | Extra          |
+---------+---------+------+-----+---------+----------------+
| ID      | int(11) | NO   | PRI | NULL    | auto_increment |
| user    | text    | YES  |     | NULL    |                |
| Message | text    | NO   |     | NULL    |                |
+---------+---------+------+-----+---------+----------------+

table 'user' : 
+-------+---------+------+-----+---------+----------------+
| Field | Type    | Null | Key | Default | Extra          |
+-------+---------+------+-----+---------+----------------+
| ID    | int(11) | NO   | PRI | NULL    | auto_increment |
| user  | text    | NO   |     | NULL    |                |
| pass  | text    | NO   |     | NULL    |                |
+-------+---------+------+-----+---------+----------------+
