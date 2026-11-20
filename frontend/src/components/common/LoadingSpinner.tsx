import React from "react";

export function LoadingSpinner({ text = "Loading verified professionals..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-purple-100" />
        <div className="absolute inset-0 rounded-full border-4 border-brand-600 border-t-transparent animate-spin" />
      </div>
      <p className="mt-4 text-sm font-semibold text-gray-600 animate-pulse">
        {text}
      </p>
    </div>
  );
}

export function WorkerCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft animate-pulse flex flex-col justify-between h-[360px]">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-24 bg-gray-200 rounded-full" />
          <div className="h-8 w-8 bg-gray-200 rounded-xl" />
        </div>
        <div className="flex gap-4 items-center mb-5">
          <div className="w-16 h-16 bg-gray-200 rounded-2xl flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-5 w-3/4 bg-gray-200 rounded-md" />
            <div className="h-4 w-1/2 bg-gray-200 rounded-md" />
            <div className="h-3 w-1/3 bg-gray-200 rounded-md" />
          </div>
        </div>
        <div className="h-16 bg-gray-100 rounded-2xl mb-4" />
      </div>
      <div className="flex gap-2">
        <div className="h-11 flex-1 bg-gray-200 rounded-xl" />
        <div className="h-11 w-20 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}
