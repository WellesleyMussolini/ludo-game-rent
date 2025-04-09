### Tarefas

- CHECAR ACTION MODAL

- Perguntar sobre o estado "animation" pois se repetiu diversas vezes

- Verificar classes repetidas e passar para o globals.css

- Implementar a rota "/about" e adicionar um meio para o usuário acessa-la.

- Adicionar a api do telegram na api do ludo cafe.

- Trechos de código que precisam ser corrigidos eu adicionei o comentário: // NEEDS TO BE FIXED

- Jogos antigos estão ficando no top no historico de alugueis enquanto os novos estao indo para baixo quando devolvidos.

- Tratar no backend a ordenação dos alugueis, como prioridade de jogo atrasado e jogo antigo ficando mais para baixo.

- Adicionar os valores que estão faltando no mapper dos rentals.

- Tratar usuarios que não tiverem CPF registrado para terem de registrar caso queiram realizar um aluguel.

### BUGS

- Ao atualizar o status de um aluguel na rota: "/admin", uma mensagem de error está aparecendo na tela.

- Na rota "/admin" ao registrar um jogo, o input destinado à inserção do valor permite que o usuário altere os números ao rolar o scroll do mouse.

- Problema ao carregar a imagem do jogo no formulário de criação (rota "/admin")
  Ao adicionar o ID de um jogo no formulário de criação, após o processamento e retorno dos dados da API, a segunda etapa do formulario, a imagem do jogo inicialmente aparece vazia. Poucos instantes depois, os elementos do formulário deslocam-se para baixo à medida que a imagem é carregada gradualmente, de cima para baixo.

- Mudança de Role na rota "/admin/users" está funcionando, porém não está atualizando instantaneamente, as vezes é necessário deslogar da aplicação e reconectar para que seja aplicado as mudanças. Eu gostaria que elas fossem instantaneas.

- adicionar tratativas caso o usuario tente acessar a rota: "/search" pois a rota isolada "/search" deve retornar not found, o que não está acontecendo no momento

- refatorar a pagina cart e seus componentes e funções. E tratar a responsividade do cart summary.

- Adicionar um meio inteligente do usuário acessar o about de um jogo tanto pelo seu id quanto pelo nome. Isso pode causar conflito no futuro pois jogos com o mesmo nome podem causar problemas. Tratar esse error pois no momento não é possível acessar a página do about do jogo pelo nome, apenas pelo id.

- Limpar todas as mensagens de error no console do browser e remover todos os trechos de condigo com console.log

### CODE
