# test Websocket chat with bdd authentification

##requierement :<br>
```bash
npm install --save ws
npm install --save mysql
```
<br>

##db config (mysql) : 
<br>
```bash
+----------------+
| Tables_in_test |
+----------------+
| chat           |
| user           |
+----------------+
```
```bash
table 'chat' :
+---------+---------+------+-----+---------+----------------+
| Field   | Type    | Null | Key | Default | Extra          |
+---------+---------+------+-----+---------+----------------+
| ID      | int(11) | NO   | PRI | NULL    | auto_increment |
| user    | text    | YES  |     | NULL    |                |
| Message | text    | NO   |     | NULL    |                |
+---------+---------+------+-----+---------+----------------+
```
```bash
table 'user' : 
+-------+---------+------+-----+---------+----------------+
| Field | Type    | Null | Key | Default | Extra          |
+-------+---------+------+-----+---------+----------------+
| ID    | int(11) | NO   | PRI | NULL    | auto_increment |
| user  | text    | NO   |     | NULL    |                |
| pass  | text    | NO   |     | NULL    |                |
+-------+---------+------+-----+---------+----------------+
```
<br>
