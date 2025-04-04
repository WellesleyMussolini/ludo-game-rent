"use client";

import {
  PrimaryInput,
  PrimaryInputTypes,
} from "@/app/common/components/primary-input";
import React, { useState } from "react";
import { ModalStepper } from "@/app/common/components/modal-stepper/modal-stepper.component";

export const GetStartedComponent = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [cpf, setCpf] = useState("");

  const stepsContent = {
    registerCpf: (
      <PrimaryInput
        type={PrimaryInputTypes.TEXT}
        text={cpf}
        placeholder="Digite seu CPF..."
        label="Digite o CPF"
        handleOnChange={setCpf}
      />
    ),
    confirmInformations: (
      <div className="flex flex-col gap-5 text-center w-full">
        <p className="text-gray-700">Confirme seus dados</p>
        <p className="flex justify-start text-left">CPF: {cpf}</p>
      </div>
    ),
  };

  const stepKeys = Object.keys(stepsContent); // Array of step names
  const totalSteps = stepKeys.length;

  return (
    <ModalStepper
      totalSteps={totalSteps}
      handleSubmit={() => alert("Dados enviados!")}
      currentStep={stepIndex}
      stepsKeys={stepKeys}
      stepsContent={stepsContent}
      handleChangeStep={setStepIndex}
    />
  );
};
