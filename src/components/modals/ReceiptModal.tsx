import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useRef} from "react";
import Receipt from "@/components/receipt";
import {useReactToPrint} from "react-to-print";

export default function ReceiptModal({isOpen, closeModal, order}: {
  isOpen: boolean,
  closeModal: any,
  order: any
}) {
  const ref = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
    documentTitle: order.ladingCode,

  })
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25"/>
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
              <Dialog.Panel
                className=" max-h-[90vh] transform overflow-scroll bg-bgColor1 p-6 text-left
              align-middle shadow-xl transition-all">
                <div ref={ref}>
                  <Receipt
                    transportCode={order.ladingCode}
                    senderName={order.senderName}
                    senderAddress={order.senderAddress}
                    senderPhone={order.senderPhone}
                    receiverName={order.receiverName}
                    receiverAddress={order.receiverAddress}
                    receiverPhone={order.receiverPhone}
                    date={new Date(order.dateCreated).toDateString()}
                  />
                </div>
                <div className="flex flex-row-reverse w-full">
                  <button onClick={handlePrint}
                          className="p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700
                focus:outline-none dark:focus:ring-blue-800 w-[150px]">
                    In hoá đơn
                  </button>
                  <button className="p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700
                focus:outline-none dark:focus:ring-blue-800 w-[150px]"
                          onClick={() => closeModal()}
                  >
                    Trở lại
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}