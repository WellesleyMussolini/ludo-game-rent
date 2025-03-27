### Tarefas

- Melhorar o design do formulário de criação de jogos.

- Arrumar o layout em versões mobiles com um footer de celular.

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

#### **Table Component Documentation**

<h2>Saving the code of the table that is partially completed but needs a few adjustments.  
I'm documenting it here because if any problem happens, I can just come here and copy this already functional table.</h2>

```jsx
<div className="relative overflow-x-auto">
  <table className="w-[1000px] shadow-md sm:rounded-lg text-gray-500 dark:text-gray-400 table-fixed">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3 w-1/4">
          {isUserOrAdminPath ? "BOARDGAME" : "USER"}
        </th>
        <th scope="col" className="text-center px-6 py-3 w-1/4">
          {isUserOrAdminPath ? "INICIO DO ALUGUEL" : "BOARDGAME"}
        </th>
        <th scope="col" className="text-center px-6 py-3 w-1/4">
          STATUS
        </th>
        <th scope="col" className="text-center px-6 py-3 w-1/4">
          {isUserOrAdminPath ? "FIM DO ALUGUEL" : "ATUALIZAR"}
        </th>
      </tr>
    </thead>
    <tbody className="text-xs">
      {rentals.map((game, index) => (
        <tr
          key={index}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          {/* user or boardgame column */}
          <td className="text-xs px-6 py-4">
            <UserOrBoardgameInfo
              data={{
                image: isUserOrAdminPath ? game.boardgameImage : game.userImage,
                name: isUserOrAdminPath ? game.boardgameName : game.userName,
                subtitle: isUserOrAdminPath
                  ? formatCurrency(game.price)
                  : game.userEmail,
              }}
            />
          </td>

          {/* boardgame or rental days remaining column */}
          <td className="text-xs px-6 py-4">
            <div className="flex justify-center items-center gap-3">
              {isUserOrAdminPath ? (
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                  <div className="font-medium">
                    {formatDate(game.rentalStartDate)}
                  </div>
                </div>
              ) : (
                <UserOrBoardgameInfo
                  data={{
                    image: isUserOrAdminPath
                      ? game.userImage
                      : game.boardgameImage,
                    name: isUserOrAdminPath
                      ? game.userName
                      : game.boardgameName,
                    subtitle: isUserOrAdminPath
                      ? game.userEmail
                      : formatCurrency(game.price),
                  }}
                />
              )}
            </div>
          </td>

          {/* rental status column */}
          <td className="px-6 py-4 w-full">
            <div className="flex items-center justify-center">
              <p className="text-center flex justify-center items-center gap-2 rounded-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className={`${
                      game.rentalStatus === RentalStatusType.RETURNED &&
                      "hidden"
                    } animate-ping absolute inline-flex h-full w-full rounded-full
                                        ${
                                          game.rentalStatus ===
                                            RentalStatusType.ACTIVE &&
                                          "bg-green-500"
                                        }
                                        ${
                                          game.rentalStatus ===
                                            RentalStatusType.OVERDUE &&
                                          "bg-error"
                                        }
                                        opacity-75`}
                  />
                  <span
                    className={`${
                      game.rentalStatus === RentalStatusType.RETURNED &&
                      "hidden"
                    } relative inline-flex rounded-full h-2.5 w-2.5
                                  ${
                                    game.rentalStatus ===
                                      RentalStatusType.ACTIVE && "bg-green-500"
                                  }
                                  ${
                                    game.rentalStatus ===
                                      RentalStatusType.OVERDUE && "bg-error"
                                  }
                                  `}
                  ></span>
                </span>
                <p
                  className={`text-xs font-semibold
                                           ${
                                             game.rentalStatus ===
                                               RentalStatusType.ACTIVE &&
                                             "text-green-500"
                                           }
                                           ${
                                             game.rentalStatus ===
                                               RentalStatusType.OVERDUE &&
                                             "text-error"
                                           }
                                           ${
                                             game.rentalStatus ===
                                               RentalStatusType.RETURNED &&
                                             "text-gray-500"
                                           }`}
                >
                  {TranslateRentalStatus[game.rentalStatus ?? "active"]}
                </p>
              </p>
            </div>
          </td>

          {/* update rental column */}
          <td className="text-center px-6 py-4 w-full">
            {isUserOrAdminPath ? (
              <p>{formatDate(game.rentalEndDate)}</p>
            ) : (
              <PrimaryButton
                onClick={() => {
                  onSelectRental(game);
                  setIsVisible({ ...isVisible, updateRentalStatus: true });
                }}
                text="ATUALIZAR"
                type={PrimaryButtonTypes.OUTLINED}
              />
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```
