import React, { useState, useRef, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import HubspotForm from 'react-hubspot-form'
import './EmailSignup.css';

const HUBSPOT_PORTAL_ID = '44445689';
const HUBSPOT_FORM_ID = 'f0b4f21e-9ddc-4fff-a88d-bba812a2d084';

const EmailSignUp = () => {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  return (
    <div className="email-signup">
      <p className="email-signup-header">Want product news and updates? Sign up for our newsletter.</p>
      <button onClick={() => setOpen(true)} className="signup-button font-medium">Subscribe</button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="flex p-5 flex-col text-left bg-panoptic-purple">
                    <h3 className="text-lg font-medium text-white mb-0">Get the latest product news and updates</h3>
                  </div>
                  <div className="bg-gray-50 flex-grow p-6">
                    <HubspotForm
                      portalId={HUBSPOT_PORTAL_ID}
                      formId={HUBSPOT_FORM_ID}
                      onSubmit={() => setOpen(false)}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

export default EmailSignUp;
