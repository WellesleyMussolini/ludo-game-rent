### Tarefas Pendentes

- Verificar classes repetidas e passar para o globals.css

### BUGS

- Ao registrar um jogo na rota: "/admin" salvar o jogo e abrir novamente o modal de criação de jogo, o botão do primeiro passo de inserir o id vai estar com o loading carregando.

- Mudança de Role na rota "/admin/users" está funcionando, porém não está atualizando no frontend.

- Ao deletar um jogo no frontend, a informação é deletada em tempo real na api mas demora para aparecer no frontend.

- tratar a responsividade do formulario de criar jogos.

- Ao adicionar um cargo ( role ) aos usuários a informação atualiza instantaneamente no banco de dados, porém leva um tempo para atualizar no site.

### MODIFICAÇÕES

- Deletar o arquivo "boardgames.api.ts" e mover a logica dos métodos HTTP para o arquivo: "boardgames.service.ts".
