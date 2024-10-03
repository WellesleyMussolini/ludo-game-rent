"use server";

import { sizeIcons } from "@/app/common/constants/size-icons";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";

export default async function About() {
  return (
    <div className="flex justify-center items-center min-h-screen pt-28 py-10">
      <div className="flex flex-col p-10  max-w-4xl max-xl:w-[65%] max-sm:w-[80%] bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Sobre nós</h1>
        <p className="text-gray-600 mb-4">
          Aqui está tudo o que você precisa saber para alugar o nosso serviço:
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Informações e Aluguel em:
          </h2>
          <div className="flex items-center gap-2 max-[400px]:flex-col max-[400px]:items-start">
            <p className="flex gap-2 items-center">
              WhatsApp:
              <IoLogoWhatsapp
                size={sizeIcons.small}
                className="text-primary hover:scale-125 duration-300"
              />
            </p>
            <p>(31) 3646-6046</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Retirada de Jogos:</h2>
          <ul className="list-disc list-inside">
            <li>
              de quinta a sábado, entre 16:30h e 22h, temos a opção de delivery
              de acordo com a região da entrega;
            </li>
            <li>
              os jogos vão com uma lista de componentes conferidos, é importante
              conferir ao retirar um jogo.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Devolução:</h2>
          <p>terças feiras, entre 16:30h e 22h.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Higienização e Quarentena:
          </h2>
          <ul className="list-disc list-inside">
            <li>de terça a quinta de manhã os jogos ficarão em quarentena;</li>
            <li>às quintas todos os jogos serão higienizados.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Planos:</h2>
          <p>Temos jogos em valores variados a partir de R$10,00</p>
          <p>
            Temos alguns jogos importados, sem manual de regras em português.
          </p>
          <p>
            Verifique antecipadamente a disponibilidade de regras em português.
          </p>
        </div>

        <div className="pt-6 border-t">
          <h2 className="text-xl font-semibold mb-8">Colaboradores:</h2>
          <div className="flex justify-around">
            {/* Iterate over collaborators' data */}
            {/* Example: */}
            <div className="flex flex-col items-center">
              <img
                src="https://github.com/user1.png"
                alt="User 1"
                className="w-16 h-16 rounded-full"
              />
              <span className="text-sm text-gray-700 mt-2">User1</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://github.com/user2.png"
                alt="User 2"
                className="w-16 h-16 rounded-full"
              />
              <span className="text-sm text-gray-700 mt-2">User2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
