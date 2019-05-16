# test Websocket chat with bdd authentification
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbenizz0%2Ftestws.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbenizz0%2Ftestws?ref=badge_shield)


### requierement :
```bash
npm install --save ws
npm install --save mysql
```
<br>

### db config (mysql) :
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


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbenizz0%2Ftestws.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbenizz0%2Ftestws?ref=badge_large)