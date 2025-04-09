"use client";

import React from "react";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/common/components/buttons";
import { Animations } from "../../types/animations.enum";
import { IoMdClose } from "react-icons/io";

type ModalStepperProps = {
  buttonType?: PrimaryButtonTypes;
  isLoading: boolean;
  animation?: string;
  currentStep: number;
  totalSteps: number;
  stepsKeys: string[];
  stepsContent: Record<string, JSX.Element>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleSubmit: () => void;
  handleClose?: () => void;
};

export const ModalStepper = ({
  buttonType = PrimaryButtonTypes.PRIMARY,
  isLoading = false,
  animation = Animations.ANIMATION_JUMP,
  currentStep = 0,
  totalSteps,
  stepsKeys,
  stepsContent,
  handleSubmit,
  handleClose,
  handleNextStep,
  handlePreviousStep,
}: ModalStepperProps) => {
  return (
    <div
      className={`z-40 ${animation} bg-white rounded-lg shadow-lg w-96 max-h-96 h-auto relative transition-all duration-500 scale-100 flex flex-col`}
    >
      {handleClose && (
        <div
          className={`bg-white ${
            currentStep > 0 && "py-6"
          } flex justify-between gap-12`}
        >
          <IoMdClose
            className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={handleClose}
            size={25}
          />
        </div>
      )}

      {/* step content with scroll */}
      <div className="flex-1 flex justify-center overflow-y-auto px-6 pt-10 pb-5">
        <div
          key={stepsKeys[currentStep]}
          className="opacity-100 transition-opacity duration-500 w-full"
        >
          {stepsContent[stepsKeys[currentStep]]}
        </div>
      </div>

      {/* button navigation */}
      <div className="bg-white shadow-md p-6 flex justify-between gap-12">
        {currentStep > 0 && (
          <PrimaryButton
            onClick={handlePreviousStep}
            text="voltar"
            type={PrimaryButtonTypes.SECONDARY}
            styles="cursor-pointer"
          />
        )}
        <PrimaryButton
          isLoading={isLoading}
          onClick={currentStep < totalSteps - 1 ? handleNextStep : handleSubmit}
          text={currentStep < totalSteps - 1 ? "avançar" : "finalizar"}
          type={buttonType}
          disabled={buttonType === PrimaryButtonTypes.DISABLED}
        />
      </div>
    </div>
  );
};
