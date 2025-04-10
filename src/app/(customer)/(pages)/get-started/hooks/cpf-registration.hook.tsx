"use client";

import {
  PrimaryInput,
  PrimaryInputTypes,
} from "@/app/common/components/primary-input";
import { useUserSession } from "@/app/common/hooks/session.hook";
import { usersService } from "@/app/common/services/users.service";
import { Animations } from "@/app/common/types/animations.enum";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import { formatCpf } from "@/app/common/utils/format-cpf";
import { handleAnimationCloseModal } from "@/app/common/utils/handle-animation-close";
import { cpf } from "cpf-cnpj-validator";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export const useCpfRegistration = () => {
  const { session } = useUserSession();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isCpfRegistered, setIsCpfRegistered] = React.useState<boolean>(false);
  const [stepIndex, setStepIndex] = React.useState<number>(0);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [userCpf, setUserCpf] = React.useState<string>("");
  const [animation, setAnimation] = React.useState<string>(
    Animations.ANIMATION_JUMP_IN
  );

  const router = useRouter();

  const stepsContent = {
    registerCpf: (
      <PrimaryInput
        type={PrimaryInputTypes.TEXT}
        text={formatCpf(userCpf)}
        placeholder="Digite seu CPF..."
        label="Digite o CPF"
        handleOnChange={setUserCpf}
      />
    ),
    confirmInformations: (
      <div className="flex flex-col gap-5 text-center w-full">
        <p className="text-gray-700">Confirme seus dados</p>
        <div className="flex flex-row justify-start items-center gap-2">
          <p className="flex justify-start text-left text-gray-700">CPF:</p>
          <p>{formatCpf(userCpf)}</p>
        </div>
      </div>
    ),
  };

  const stepKeys = Object.keys(stepsContent); // Array of step names
  const totalSteps = stepKeys.length;
  const isCpfValid = cpf.isValid(userCpf);

  const handleChangeStep = (step: number) => {
    if (!isCpfValid) {
      toast.error("CPF inválido");
      return;
    }
    return setStepIndex(step);
  };

  const closeModal = (): void =>
    handleAnimationCloseModal({
      handleModalVisibility: setIsModalOpen,
      handleAnimation: setAnimation,
    });

  const handleSubmitCPF = () => {
    setIsLoading(true);
    usersService.update({ id: session?.user.id, cpf: userCpf });
    setIsLoading(false);
    closeModal();
    toast.success("CPF atualizado com sucesso");
    setIsCpfRegistered(true);
    setTimeout(() => router.push(Pathnames.HOME), 2000);
  };
  return {
    totalSteps,
    stepIndex,
    stepKeys,
    stepsContent,
    isCpfRegistered,
    isModalOpen,
    animation,
    isLoading,
    closeModal,
    setIsModalOpen,
    handleSubmitCPF,
    handleChangeStep,
  };
};
