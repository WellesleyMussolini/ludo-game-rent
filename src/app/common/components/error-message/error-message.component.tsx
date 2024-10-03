"use client"

export const ErrorMessage = ({ title, message }: { title: string, message: string }) => (
  <div className="py-8 px-4 flex flex-grow items-center justify-center">
    <div className="rounded-lg bg-white p-8 text-center shadow-xl break-words">
      <h1 className="mb-4 text-xl sm:text-2xl md:text-4xl font-bold">{title}</h1>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);