# Vértis Teste

Repositório utilizado para expor teste para a empresa Vértis. 

# Como rodar

`git clone https://github.com/tgremi/vending-machine`  

    cd vending-machine

```javascript
npm install 
```
**OBS:** O teste possui um arquivo data.json, arquivo responsável por administrar o *"saldo"* disponível   na máquina, então para *"inserir"* mais moedas é necessário editar este arquivo. 

Para executar manualmente: 

```javascript
node main.js
```

No terminal aparecerá a pergunta *"Qual o valor inserido?"*, digite o valor para simular o *"input"* do dinheiro na máquina, feito pelo usuário. 
Digite o valor e tecle enter, em seguida aparecera a pergunta *"Qual o total da compra?"*, insira um valor para simular a escolha de produtos feita pelo usuário. 



Para executar os arquivos de teste:  
```javascript
npm test
```



