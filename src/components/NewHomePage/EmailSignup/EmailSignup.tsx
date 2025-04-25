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
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const handleInterestSubmit = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-signup-container relative z-0">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 items-stretch gap-8 pb-12">
        {/* Competition CTA */}
        <div className="interest-section bg-panoptic-purple flex flex-col justify-center h-full text-center shadow-md px-8 py-4 rounded-lg text-white">
          <img
            src="/img/panoptic-base-competition-banner.svg"
            alt="Trading Competition"
            className="mx-auto w-60 h-auto mb-4 mt-2"
          />
          <p className="text-lg font-semibold">Join our Trading Competition on Base</p>
          <button
            onClick={() => setInterestOpen(true)}
            className="mt-2 px-8 py-3 bg-white text-panoptic-purple font-semibold rounded-lg hover:bg-gray-100 transition ease-in-out duration-150 active:scale-95"
          >
            I'm in!
          </button>
        </div>

        {/* Newsletter CTA */}
        <div className="newsletter-section bg-white flex flex-col justify-center h-full text-center shadow-md px-8 py-4 rounded-lg">
          <img
            src="/img/newsletter-icon.svg"
            alt="Newsletter Icon"
            className="mx-auto w-60 h-auto mb-6"
          />
          <p className="text-lg font-semibold text-panoptic-purple mb-2">
            Subscribe for Newsletter Updates
          </p>
          <button
            onClick={() => setNewsletterOpen(true)}
            className="mt-4 px-8 py-3 bg-panoptic-purple text-white font-semibold rounded-lg hover:bg-purple-700 transition ease-in-out duration-150 active:scale-95"
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
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="max-w-md w-full bg-white rounded-lg overflow-hidden shadow-xl">
                  <div className="bg-panoptic-purple p-5">
                    <h3 className="text-lg font-semibold text-white">Join our Competition!</h3>
                  </div>
                  <div className="p-6 space-y-6 text-gray-700">
                    <div className="mb-6">
                      <div className="flex justify-center space-x-4 mb-4">
                        <span className="px-3 py-1 bg-white text-panoptic-purple rounded-full text-sm font-medium shadow">
                          $5,000 cash
                        </span>
                        <span className="px-3 py-1 bg-white text-panoptic-purple rounded-full text-sm font-medium shadow">
                          5M+ Pips
                        </span>
                        <span className="px-3 py-1 bg-white text-panoptic-purple rounded-full text-sm font-medium shadow">
                          Plushie
                        </span>
                      </div>
                      <p className="text-base text-gray-700 font-medium">
                        Unlock a one-time <strong>1.1× Pips boost</strong> when you sign up early!
                      </p>
                    </div>
                    {successMessage ? (
                      <div className="text-green-600 font-medium">{successMessage}</div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleInterestSubmit();
                        }}
                        className="bg-gray-50 p-6 space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            disabled={loading}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            className="mt-1 w-[94%] border border-gray-300 rounded-md bg-white p-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-panoptic-purple focus:border-panoptic-purple"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Wallet Address</label>
                          <input
                            type="text"
                            name="wallet"
                            disabled={loading}
                            value={wallet}
                            onChange={(e) => setWallet(e.target.value)}
                            required
                            placeholder="0x1234…"
                            className="mt-1 w-[94%] border border-gray-300 rounded-md bg-white p-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-panoptic-purple focus:border-panoptic-purple"
                          />
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                          <button
                            type="button"
                            onClick={() => setInterestOpen(false)}
                            ref={cancelButtonRef}
                            disabled={loading}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition ease-in-out duration-150"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center px-4 py-2 bg-panoptic-purple text-white rounded hover:bg-purple-800 active:scale-95 transition ease-in-out duration-150 disabled:opacity-50"
                          >
                            {loading && (
                              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                              </svg>
                            )}
                            {loading ? 'Submitting...' : 'Submit'}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Newsletter Modal (original) */}
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
                    <h3 className="text-xl font-semibold text-white mb-0">Get the latest product news and updates</h3>
                  </div>
                  <div className="bg-gray-50 p-6">
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
