"use client";

import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/common/components/buttons";
import React from "react";

type ModalStepperProps = {
  currentStep: number;
  totalSteps: number;
  stepsKeys: string[];
  stepsContent: Record<string, JSX.Element>;
  handleChangeStep: (step: number) => void;
  handleSubmit: () => void;
};

export const ModalStepper = ({
  currentStep = 0,
  totalSteps,
  stepsKeys,
  stepsContent,
  handleChangeStep,
  handleSubmit,
}: ModalStepperProps) => {
  const nextStep = () =>
    handleChangeStep(Math.min(currentStep + 1, totalSteps - 1));
  const prevStep = () => handleChangeStep(Math.max(currentStep - 1, 0));

  return (
    <div className="animate-jump bg-white rounded-lg shadow-lg w-96 max-h-96 h-auto relative transition-all duration-500 scale-100 flex flex-col">
      {/* step content with scroll */}
      <div className="flex-1 flex justify-center overflow-y-auto px-6 pt-10 pb-5">
        <div
          key={stepsKeys[currentStep]}
          className="opacity-100 transition-opacity duration-500 w-full"
        >
          {stepsContent[stepsKeys[currentStep]]}
        </div>
      </div>

      {/* button navigation fixed */}
      <div className="bg-white shadow-md p-6 flex justify-between gap-12">
        {currentStep > 0 && (
          <PrimaryButton
            onClick={prevStep}
            text="voltar"
            type={PrimaryButtonTypes.DISABLED}
            styles="cursor-pointer"
          />
        )}
        <PrimaryButton
          onClick={currentStep < totalSteps - 1 ? nextStep : handleSubmit}
          text={currentStep < totalSteps - 1 ? "avançar" : "finalizar"}
          type={PrimaryButtonTypes.PRIMARY}
          styles="cursor-pointer"
        />
      </div>
    </div>
  );
};
