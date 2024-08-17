# Rotas da API no endpoint /user:

| Route                                  | HTTP(method) | Description                                 |
| -------------------------------------- | ------------ | ------------------------------------------- |
| http://localhost:3000/user/create-user | POST         | Cria usuários                               |
| http://localhost:3000/user/login       | POST         | Loga e gera token de usuários               |
| http://localhost:3000/user/profile     | GET          | Recupera info de usuários via token de auth |
