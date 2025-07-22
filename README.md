# CRUD Mobile Receitas e Medicamentos
`CRUD em React Native, que consome uma API REST em Java Spring com MySQL, proposta de exercício da disciplina de laboratório de banco de dados`
<div align="center">	
<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
<img src="https://img.shields.io/badge/MySQL-20232A?style=for-the-badge&logo=mysql&logoColor=white" />
</div>

## Tecnologias
- Frontend
  - React Native
  - Expo
  - TypeScript
   - Node (para gerenciar dependências)
- Backend
  - Maven
  - Java
  - Spring
  - Flyway
- Banco de dados
  - MySQL

## Configurações
- Necessario ter instalado o Node Js e o Maven
- em \backend\src\main\resources\application.properties alterar os valores informados no arquivo
- em \frontend\src\service, nos dois arquivos, alterar o valor de API_BASE_URL para o ipv4 da maquina rodando a API (Caso esteja usando um dispositivo real com o Expo Go instalado), caso esteja usando emulador android, descomente a linha `const API_BASE_URL = 'http://10.0.2.2:8080'`, lembrando de trocar o 8080 pelo valor da porta que esta rodando a API  

## Como rodar
- App (frontend)
	- Acesse o diretório frontend
	- Use o comando do nodeJS `npm install` para instalar as dependências
	- usar o comando `npx expo start` para rodar o expo, vai ser gerado um QR Code, você deve instalar em seu celular o aplicativo "Expo Go" e ao entrar nele, apontar a camera para o QR CODE
	- Caso esteja usando emulador, com o emulador aberto, após usar o mesmo comando acima, use a tecla 'A', ele vai instalar o Expo Go e o projeto no emulador

- API (Backend)
   - Acesse o diretório backend\src\main\java\com\hospital\receitas
   - usar o comando do maven `mvn install` para instalar dependências
   - usar o comando `mvn spring start` para iniciar o projeto

## Preview

### Backend
#### Medicamento
- POST, `/medicamento`: cria um médicamento
    - Recebe: `{number id,
string nome, string tipo, number quantidade}`
    - Retorna: `(Sucesso) HTTP STATUS 201 Body: {number id,
string nome, string tipo, number quantidade}`<br> `(Falha) HTTP STATUS 400`
- GET:
  - `/medicamento`: retorna todos os médicamentos cadastrados
   - Retorna: `(Sucesso) HTTP STATUS 200 Body:[{number id,
string nome, string tipo, number quantidade}]`<br> `(Falha) HTTP STATUS 200 Body:[]`
  - `/medicamento/id`: retorna o médicamento que tenha o id informado na URL
   - Retorna: `(Sucesso) HTTP STATUS 200 {number id,
string nome, string tipo, number quantidade}`<br> `(Falha) HTTP STATUS 200 Body:{}`
- PUT `/medicamento/{id}`: Atualiza campos do médicamento que tenha o id informado na URL
  - Recebe: `{<opcional> string nome, <opcional> string tipo, <opcional> number quantidade}`
  - Retorna: `(Sucesso)HTTP STATUS 200 Body:{number id,
string nome, string tipo, number quantidade}` <br> `(Falha) HTTP STATUS 400`
- DELETE `/medicamento/{id}`: Deleta o médicamento que tenha o id informado na URL
  - Retorna: `(Sucesso) HTTP STATUS 200 | (Falha) HTTP STATUS 400`
    
#### Receita
- POST, `/receita`: cria uma receita
    - Recebe: `{  string(YYYY-MM-DD) dataReceita,
		    number[] medicamentoIds,
		    string medicoNome,
		    string pacienteNome,
		    string observacoes}`
    - Retorna: `(Sucesso) HTTP STATUS 201 Body: { number id,
   string(YYYY-MM-DD) dataReceita,
  Medicamento[] medicamentos,
    string medicoNome,
    string pacienteNome,
    string observacoes}`<br> `(Falha) HTTP STATUS 400`
- GET:
  - `/receita`: retorna todos os receitas cadastrados
    - Retorna: `(Sucesso) HTTP STATUS 200 Body:[ {  string(YYYY-MM-DD) dataReceita,
		    number[] medicamentoIds,
		    string medicoNome,
		    string pacienteNome,
		    string observacoes}]`<br> `(Falha) HTTP STATUS 200 Body:[]`
  - `/receita/id`: retorna a receita que tenha o id informado na URL
    - Retorna: `(Sucesso) HTTP STATUS 200 Body: {  string(YYYY-MM-DD) dataReceita,
		    number[] medicamentoIds,
		    string medicoNome,
		    string pacienteNome,
		    string observacoes}`<br> `(Falha) HTTP STATUS 200 Body:{}`
  - `/receita/paciente/{nome}`: retorna as receitas do paciente cujo o nome será informado na URL
    - Retorna: `(Sucesso) HTTP STATUS 200 Body: [ {  string(YYYY-MM-DD) dataReceita,
		    number[] medicamentoIds,
		    string medicoNome,
		    string pacienteNome,
		    string observacoes} ] , {...}`<br> `(Falha) HTTP STATUS 200 Body:{}`
- PUT `/receita/{id}`: Atualiza campos da receita que tenha o id informado na URL
   - Recebe: `Body:{ <opcional> string(YYYY-MM-DD) dataReceita,
		    <opcional> number[] medicamentoIds,
		    <opcional> string medicoNome,
		    <opcional> string pacienteNome,
		    <opcional> string observacoes}`
   - Retorna: `(Sucesso)HTTP STATUS 200 Body:{  string(YYYY-MM-DD) dataReceita,
		    number[] medicamentoIds,
		    string medicoNome,
		    string pacienteNome,
		    string observacoes}` <br> `(Falha) HTTP STATUS 400`
- DELETE `/receita/{id}`: Deleta a receita que tenha o id informado na URL
   - Retorna: ` (Sucesso) HTTP STATUS 200 | (Falha) HTTP STATUS 400`
     
 ### FrontEnd / Mobile
 
 <div align="center">
 <h2>Medicamento</h2>
 <h3> Exibir, Cadastrar, Atualizar e Excluir Medicamentos </h3>
 <img  width="40%" alt="medicamentos_preview" src="https://github.com/user-attachments/assets/65fd92af-a5c0-44ee-87a4-df31e29625eb" />
 </div>

 <div align="center">
 <h2>Receita</h2>
 <h3> Exibir, Cadastrar, Atualizar e Excluir <strong>Receitas</strong> </h3>
 <img  width="40%" alt="receitas_preview" src="https://github.com/user-attachments/assets/d1ec8a43-6213-4bf5-ac77-5326e67b5e8c" />

 <h3>Filtrar <strong>Receitas</strong> pelo nome do paciente</h3>
 <img width="40%" alt="receitas_filtro_preview" src="https://github.com/user-attachments/assets/a6dc056b-7c12-4e00-936e-0ef12e86f6ac"/>
 </div>
