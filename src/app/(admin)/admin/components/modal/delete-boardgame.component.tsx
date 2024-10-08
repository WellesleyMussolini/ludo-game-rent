import { useIsLoading } from "@/app/common/hooks/is-loading.hook";
import { sizeIcons } from "@/app/common/constants/size-icons";
import { useContext } from "@/app/common/context/context";
import { GoAlertFill } from "react-icons/go";
import { OverlayBackground } from "@/app/common/components/overlay-background/overlay-background.component";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/common/components/buttons";
import { boardGamesService } from "@/app/common/services/boardgames.service";

export const DeleteBoardGame = () => {
  const { modals, setModals, getBoardGameId, setGetBoardGameId } = useContext();
  const { isLoading, setIsLoading } = useIsLoading();
  return (
    <>
      {modals.deleteBoardGame && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <OverlayBackground
            onClose={() => setModals({ ...modals, deleteBoardGame: false })}
          />
          <div
            className="relative max-[400px]:w-[80%] z-[60] bg-white gap-2 flex flex-col rounded-2xl border border-blue-100 bg-contrastBackground p-4 shadow-lg sm:p-6 lg:p-8 animate-jump-in animate-delay-[1ms]"
            role="alert"
          >
            <div className="w-full flex items-center justify-center">
              <GoAlertFill className="text-error" size={sizeIcons.larger} />
            </div>
            <p className="mt-4 text-gray-500 text-center">Tem certeza ?</p>
            <div className="mt-6 flex flex-wrap gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
              <PrimaryButton
                text="Deletar"
                isLoading={isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  await boardGamesService.delete(getBoardGameId);
                  setGetBoardGameId("");
                  setModals({ ...modals, deleteBoardGame: false });
                  setIsLoading(false);
                }}
                type={PrimaryButtonTypes.DELETE}
              />
              <PrimaryButton
                text="Cancelar"
                onClick={() => setModals({ ...modals, deleteBoardGame: false })}
                type={PrimaryButtonTypes.SECONDARY}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
