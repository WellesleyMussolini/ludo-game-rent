### Tarefas

- Verificar classes repetidas e passar para o globals.css

### BUGS

- Ao registrar um jogo na rota: "/admin" salvar o jogo e abrir novamente o modal de criação de jogo, o botão do primeiro passo de inserir o id vai estar com o loading carregando.

- Mudança de Role na rota "/admin/users" está funcionando, porém não está atualizando no frontend.

- Ao deletar um jogo no frontend, a informação é deletada em tempo real na api mas demora para aparecer no frontend.

- Ao adicionar um cargo ( role ) aos usuários a informação atualiza instantaneamente no banco de dados, porém leva um tempo para atualizar no site.

- Não estou conseguindo utilizar o método find by name dentro do component boardgame por conflito da logica

- substituir a logica de acessar o boardgame about pelo nome para acessar pelo ID, a logica esta redundante e ao inves de acessar apenas um jogo esta retornando varios.

- tratars os bugs no console.log ao acessar o boardgame about, quando a tela esta em carregando mensagens de error sao geradas.

- adicionar tratativas caso o usuario tente acessar a rota: "/search" pois esta causando loop infinito.

### MODIFICAÇÕES

- Deletar o arquivo "boardgames.api.ts" e mover a logica dos métodos HTTP para o arquivo: "boardgames.service.ts".

### CODE

- Substituir esse trecho de código:

```javascript
const foundGame = await ludoApi.boardgames.findByName(
  formatStringForApi(param)
);
if (!foundGame || foundGame.statusCode === 404) {
  return (
    <ErrorMessage title={foundGame.statusCode} message={foundGame.message} />
  );
}

const boardgame = foundGame[0];
```

- Por esse:

```javascript
const foundGame = await boardGamesService.getByName(formatStringForApi(param));

const boardgame = foundGame;
```

- A alteração acima so poderá ser feita quando o find all for substituido do prisma pelo find all da api no arquivo boardgame.service.tsx.

- Rota da substituição da lógica: "src/app/common/components/boardgame/boardgame.component.tsx"
