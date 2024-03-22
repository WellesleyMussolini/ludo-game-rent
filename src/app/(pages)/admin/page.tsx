"use client"

import React from "react";
import { useSession } from "next-auth/react";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";
import { BoardGameForm } from "./components/boardgame-form/boardgame-form.component";


export default function Admin() {
    // const { status } = useSession();
    // if (status !== "authenticated") return redirect("/admin/login"); SWITCH PAGE INSTANTLY BUT NEVER ACESS THE "/ADMIN" ROUTE
    // if (status === "unauthenticated") return redirect("/admin/login");
    // adicionar um token de logado para verificar no navegador do usuario se ele está conectado.

    const [formVisibility, setFormVisibility] = React.useState<boolean>(false);



    return <div className={`flex items-center justify-center duration-300`} style={{ minHeight: "calc(100vh - 80px)" }}>
        <BoardGameForm
            visibility={formVisibility}
            handleVisibility={setFormVisibility}
        />
        {/* <BoardGameCatalogue /> */}
        <div className="fixed top-28 left-10">
            <PrimaryButton text="abrir formulário" handleClick={() => setFormVisibility(true)} type={EnumPrimaryButton.PRIMARY} />
        </div>




    </div>
};



// export const InputTest = ({ handleOnChange }: { handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => (
//     <input onChange={handleOnChange} placeholder="Digite Algo" />
// );

// const InputTest2 = ({ handleOnChangeField }: { handleOnChangeField: (field: string, event: React.ChangeEvent<HTMLInputElement>) => void }) => (
//     <InputTest handleOnChange={(event) => handleOnChangeField("name", event)} />
// );
        {/* <div> */}
            {/* <p>name: {gameApiData.name}</p> */}
            {/* <InputTest2 handleOnChangeField={handleOnChangeFields} /> */}
        {/* </div> */}