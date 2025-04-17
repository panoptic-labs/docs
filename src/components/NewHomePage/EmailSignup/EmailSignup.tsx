import React, { useState, useRef, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import HubspotForm from 'react-hubspot-form';
import './EmailSignup.css';

const HUBSPOT_PORTAL_ID = '44445689';
const HUBSPOT_FORM_ID = 'f0b4f21e-9ddc-4fff-a88d-bba812a2d084';
const WALLET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzve_cW9lMFZazClgDhOIdW8T2bd0fg27h4QeZHo4S8RJStkBZ8x1lnofxbbbSu0H5Tgw/exec';

const EmailSignUp: React.FC = () => {
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [interestOpen, setInterestOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const cancelButtonRef = useRef(null);

  const handleInterestSubmit = async () => {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('wallet', wallet);

    try {
      const res = await fetch(WALLET_ENDPOINT, { method: 'POST', body: params });
      if (!res.ok) {
        console.error('Error response:', await res.text());
        return;
      }
      setSuccessMessage("Thanks! We'll send competition updates to your inbox soon.");
      setEmail('');
      setWallet('');
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

  return (
    <div className="email-signup-container relative z-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 py-12">
        {/* Competition Block */}
        <div className="interest-section bg-panoptic-purple text-white p-8 rounded-lg text-center">
          <img
            src="/img/panoptic-base-competition-banner.svg"
            alt="Trading Competition"
            className="mx-auto w-60 h-auto mb-6"
          />
          <p className="text-3xl font-bold mb-2">Got your trading game on?</p>
          <p className="text-lg max-w-lg mx-auto mb-6">
            Join our Base trading contest for $5,000 in cash prizes, 5M+ Pips, and a giant plushie. Unlock a 1.1× Pips boost when you sign up!
          </p>
          <button
            onClick={() => setInterestOpen(true)}
            className="text-lg px-8 py-3 bg-white text-panoptic-purple font-semibold rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out transform active:scale-95"
          >
            Count Me In
          </button>
        </div>

        {/* Newsletter Block */}
        <div className="newsletter-section bg-purple-100 p-8 pt-20 rounded-lg text-center shadow-md flex flex-col justify-start">
          <p className="text-3xl font-bold leading-tight text-panoptic-purple mb-2">
            Want product news and updates?
          </p>
          <p className="text-lg font-semibold text-panoptic-purple mb-4">
            Sign up for our newsletter.
          </p>
          <button
            onClick={() => setNewsletterOpen(true)}
            className="text-lg self-center mt-auto px-8 py-3 bg-panoptic-purple text-white rounded-lg hover:bg-purple-700 transition duration-150 ease-in-out transform active:scale-95"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Interest Modal */}
      <Transition.Root show={interestOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={() => setInterestOpen(false)}
        >
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

          <div className="fixed inset-0 z-10 w-full overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative max-w-md w-full bg-white rounded-lg overflow-hidden shadow-xl">
                  <div className="bg-panoptic-purple p-5">
                    <h3 className="text-lg font-semibold text-white mb-0">
                      Express Your Interest
                    </h3>
                  </div>
                  <div className="bg-gray-50 p-6 space-y-4">
                    <p className="text-base text-gray-600">
                      We'll use your email to send competition reminders and updates.
                    </p>
                    <div>
                      <label className="block text-base font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        disabled={!!successMessage}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="mt-1 block w-full box-border border border-gray-300 rounded-md bg-white p-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-panoptic-purple focus:border-panoptic-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700">
                        Wallet Address
                      </label>
                      <input
                        type="text"
                        name="wallet"
                        disabled={!!successMessage}
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                        required
                        placeholder="0x1234…"
                        className="mt-1 block w-full box-border border border-gray-300 rounded-md bg-white p-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-panoptic-purple focus:border-panoptic-purple"
                      />
                    </div>
                    {successMessage && (
                      <div className="mt-4 text-green-600 text-center font-medium">
                        {successMessage}
                      </div>
                    )}
                    <div className="flex justify-end mt-6 space-x-3">
                      <button
                        type="button"
                        onClick={() => setInterestOpen(false)}
                        ref={cancelButtonRef}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-150"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleInterestSubmit}
                        disabled={!!successMessage}
                        className="px-4 py-2 bg-panoptic-purple text-white rounded hover:bg-purple-800 active:scale-95 transition duration-150 disabled:opacity-50"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Newsletter Modal */}
      <Transition.Root show={newsletterOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setNewsletterOpen}
        >
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

          <div className="fixed inset-0 z-10 w-full overflow-y-auto">
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
                  <div className="bg-panoptic-purple p-5">
                    <h3 className="text-lg font-semibold text-white mb-0">
                      Get the latest product news and updates
                    </h3>
                  </div>
                  <div className="bg-gray-50 flex-grow p-6">
                    <HubspotForm
                      portalId={HUBSPOT_PORTAL_ID}
                      formId={HUBSPOT_FORM_ID}
                      onSubmit={() => setNewsletterOpen(false)}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default EmailSignUp;
