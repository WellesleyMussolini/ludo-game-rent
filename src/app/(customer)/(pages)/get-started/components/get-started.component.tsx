"use client";

import {
  PrimaryInput,
  PrimaryInputTypes,
} from "@/app/common/components/primary-input";
import { useGetStarted } from "../hooks/get-started.hooks";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/common/components/buttons";
import React, { useState } from "react";

const steps = [1, 2, 3];

export const GetStarted = () => {
  const [step, setStep] = useState(1);
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="animate-jump bg-white rounded-lg shadow-lg w-96 p-6 relative transition-all duration-500 scale-100">
      <ProgressBar step={step} />

      {/* Step Content (Smooth Fade Effect) */}
      <div className="relative min-h-[120px]">
        <div
          className={`${
            step === 1 ? "block" : "hidden"
          } transition-opacity duration-500`}
        >
          <PrimaryInput
            type={PrimaryInputTypes.TEXT}
            text={cpf}
            placeholder="Digite seu CPF..."
            label="Digite o CPF"
            handleOnChange={setCpf}
          />
        </div>

        <div
          className={`${
            step === 2 ? "block" : "hidden"
          } transition-opacity duration-500`}
        >
          <label className="block text-gray-700 font-semibold">
            Data de Nascimento:
          </label>
          <input
            type="date"
            className="w-full p-2 mt-2 border rounded-md"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>

        <div
          className={`${
            step === 3 ? "block" : "hidden"
          } transition-opacity duration-500`}
        >
          <div className="text-center">
            <p className="text-gray-700 font-semibold">Confirme seus dados:</p>
            <p>
              📄 <strong>CPF:</strong> {cpf}
            </p>
            <p>
              📅 <strong>Nascimento:</strong> {birthdate}
            </p>
          </div>
        </div>
      </div>

      <NavigationButtons nextStep={nextStep} prevStep={prevStep} step={step} />
    </div>
  );
};

const ProgressBar = ({ step }: { step: number }) => (
  <div className="flex items-center justify-between mb-6">
    {steps.map((s, index) => (
      <div key={s} className="flex items-center w-full last:w-auto">
        {/* Step Circle  */}
        <div
          className={`w-7 h-7 flex items-center justify-center shrink-0 rounded-full text-sm font-semibold mx-[-1px]
            ${
              step >= s
                ? "bg-primary duration-500 text-white"
                : "bg-gray-300 text-gray-500"
            }
          `}
        >
          {s}
        </div>

        {/* Progress Bar */}
        {index !== steps.length - 1 && (
          <div className="w-full h-[3px] mx-4 rounded-lg bg-gray-300 relative overflow-hidden">
            <div
              className={`absolute left-0 top-0 h-full bg-primary transition-all duration-500 ${
                step > s ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
        )}
      </div>
    ))}
  </div>
);

const NavigationButtons = ({
  step,
  nextStep,
  prevStep,
}: {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
}) => (
  <div className="flex justify-between gap-10">
    {step > 1 && (
      <PrimaryButton
        onClick={prevStep}
        text="voltar"
        type={PrimaryButtonTypes.DISABLED}
        styles="cursor-pointer"
      />
    )}
    {step < steps.length ? (
      <PrimaryButton
        onClick={nextStep}
        text="avançar"
        type={PrimaryButtonTypes.PRIMARY}
        styles="cursor-pointer"
      />
    ) : (
      <PrimaryButton
        onClick={() => {}}
        text="finalizar"
        type={PrimaryButtonTypes.PRIMARY}
        styles="cursor-pointer"
      />
    )}
  </div>
);
