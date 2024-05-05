import React from "react";

interface Categoria {
  nome: string;
}

const categorias: Categoria[] = [
  { nome: "Estratégia" },
  { nome: "Aventura" },
  { nome: "Ficção Científica" },
  { nome: "Fantasia" },
  { nome: "Party Games" },
  { nome: "Jogos de Cartas" },
  { nome: "Jogos de Dados" },
  { nome: "Jogos de Tabuleiro" },
  { nome: "RPG" },
];

const CategoriasGames: React.FC = () => {
  return (
    <div className="gap-2 grid grid-cols-4">
      {categorias.map((categoria) => (
        <span
          className="flex text-[10px] bg-white text-zinc-900 font-semibold ring-1 ring-zinc-900 items-center justify-center p-2 rounded-md pointer-events-none"
          key={categoria.nome}
        >
          {categoria.nome}
        </span>
      ))}
    </div>
  );
};

export default CategoriasGames;
