### Tarefas Pendentes

- Verificar classes repetidas e passar para o globals.css

### BUGS
- Quando a tela do projeto atinge 640 píxels o header não vai para 100% o seu tamanho, o ícone não aparece nessa resolução. O bug não acontece nas resoluções a partir de 639 píxels para baixo e 641 píxels para cima, apenas em 640 píxels.

- tratar a responsividade do formulario de criar jogos.

- A sidebar está apenas oculta na rota de login da ADMIN. Se eu não estiver autenticado e tentar acessar apenas a rota "/admin" eu consigo visualizar a sidebar piscando.

### Código Personalizado da Home

```javascript
    // const session = await getServerSession(authOptions);
    // const findAllUsers = await prisma.user.findMany({ orderBy: { id: "desc" } });
    
    // if(!session || !session.user) return redirect("/");
```


