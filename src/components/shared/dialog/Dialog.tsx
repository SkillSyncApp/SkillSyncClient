import { Dialog as HeadledssDialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { Fragment } from "react";

type DialogProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  showHeader?: boolean;
};

function Dialog({
  show,
  onClose,
  title,
  children,
  showHeader = true,
}: DialogProps) {
  return (
    <Transition appear show={show} as={Fragment}>
      <HeadledssDialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadledssDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {showHeader && (
                  <HeadledssDialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                  >
                    {title}
                    <XMarkIcon
                      onClick={onClose}
                      className="ml-auto h-[20px] w-[20px] cursor-pointer"
                    />
                  </HeadledssDialog.Title>
                )}
                {children}
              </HeadledssDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadledssDialog>
    </Transition>
  );
}

export default Dialog;
