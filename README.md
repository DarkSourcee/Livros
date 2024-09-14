Criar um .env na raiz de api/ e configurar e roda npm i install para baixar os node modules no back e front

module.exports = {
    PORT="Porta da aplicação",
    DB_HOST="host do banco"
    DB_PORT="Porta do banco"
    DB_USER="usuário banco"
    DB_PASSWORD="senha banco"
    DB_NAME="nome banco"
}

Deve criar o banco no MySQL

após esta configuração somente rodar o .bat que ira crias a tabela e banco e somente acessar http://localhost:5173/ que irá carregar a aplicação
