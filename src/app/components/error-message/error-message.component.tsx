"use client"

import { IErrorMessage } from "./error-message.interface"

export const ErrorMessage = ({ title, message }: IErrorMessage) => <div className="px-4 break-words flex flex-grow items-center justify-center">
  <div className="rounded-lg bg-white p-8 text-center shadow-xl">
    <h1 className="mb-4 text-4xl font-bold">{title}</h1>
    <p className="text-gray-600">{message}</p>
  </div>
</div>