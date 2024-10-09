import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { BoardGame } from "../../types/boardgame.types";
import Image from "next/image";
import { PrimaryInput, PrimaryInputTypes } from "../primary-input";
import { PrimaryButton } from "../buttons";

export const UpdateBoardGame = ({ boardgame }: { boardgame: BoardGame }) => {
  return (
    <>
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        // onClick={handleCloseForm}
      >
        <IoMdClose size={25} />
      </button>

      {/* Game Image */}
      <div className="w-full flex justify-center items-center mb-4">
        <Image
          src={boardgame.image ?? ""}
          alt={boardgame.name ?? ""}
          height={60}
          width={60}
          className="rounded shadow-md"
        />
      </div>

      {/* Game Name Input */}
      <div className="w-full mb-4">
        <PrimaryInput
          placeholder="Digite o nome do jogo"
          handleOnChange={() => {}}
          //   handleOnChange={(event) => handleOnChangeFields("name", event)}
          text={boardgame.name}
          type={PrimaryInputTypes.TEXT}
        />
      </div>

      {/* Price Input */}
      <div className="w-full mb-4">
        <PrimaryInput
          //   handleOnChange={(event) => handleOnChangeFields("price", event)}
          handleOnChange={() => {}}
          text={boardgame.price}
          placeholder="Digite o preço do jogo"
          type={PrimaryInputTypes.NUMBER}
        />
      </div>

      {/* Dropdown for Game Status */}
      <div className="w-full mb-6">
        <p className="text-gray-500 mb-2">Situação</p>
        <div className="relative">
          {/* <div
            className={`flex justify-between items-center border border-gray-300 rounded px-4 py-2 cursor-pointer ${
              formStatus.dropdown ? "bg-gray-100" : "bg-white"
            }`}
            onClick={() =>
              setFormStatus({
                ...formStatus,
                dropdown: !formStatus.dropdown,
              })
            }
          >
            <p className="font-medium text-gray-700">
              {boardgame.status ?? "Selecione o status"}
            </p>
            <div>
              {formStatus.dropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </div> */}

          {/* Dropdown Content */}
          {/* {formStatus.dropdown && (
            <div className="absolute w-full bg-white border border-gray-300 rounded mt-2 shadow-lg z-10">
              <Dropdown
                styles="w-full"
                visibility={formStatus.dropdown}
                content={dropdownContent}
              />
            </div>
          )} */}
        </div>
      </div>

      {/* Save Button */}
      {/* <PrimaryButton
        isLoading={formStatus.isLoading}
        onClick={handleSaveGame}
        text="Salvar"
        type={PrimaryButtonTypes.OUTLINED}
      /> */}
    </>
  );
};
