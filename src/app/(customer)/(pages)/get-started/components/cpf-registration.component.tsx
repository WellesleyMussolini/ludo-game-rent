"use client";

import React from "react";
import { ModalStepper } from "@/app/common/components/modal-stepper/modal-stepper.component";
import {
  ActionModal,
  ActionModalType,
} from "@/app/common/components/modal/action-modal.component";
import { PrimaryButtonTypes } from "@/app/common/components/buttons";
import { useCpfRegistration } from "../hooks/cpf-registration.hook";

export const CpfRegistration = () => {
  const {
    totalSteps,
    stepIndex,
    stepKeys,
    stepsContent,
    handleSubmitCPF,
    handleChangeStep,
    setIsModalOpen,
    isCpfRegistered,
    isModalOpen,
    animation,
    isLoading,
    closeModal,
  } = useCpfRegistration();
  return (
    <div className="flex justify-center items-center h-screen">
      <ModalStepper
        totalSteps={totalSteps}
        handleSubmit={() => setIsModalOpen(true)}
        currentStep={stepIndex}
        stepsKeys={stepKeys}
        stepsContent={stepsContent}
        handleNextStep={() => handleChangeStep(stepIndex + 1)}
        handlePreviousStep={() => handleChangeStep(stepIndex - 1)}
        isLoading={false}
        buttonType={
          isCpfRegistered
            ? PrimaryButtonTypes.DISABLED
            : PrimaryButtonTypes.PRIMARY
        }
      />
      <ActionModal
        visibility={isModalOpen}
        animation={animation}
        closeModal={closeModal}
        isLoading={isLoading}
        type={ActionModalType.REGISTER_USER_CPF}
        handleExecuteAction={handleSubmitCPF}
      />
    </div>
  );
};
