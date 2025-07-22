import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
import {
  CreditCardIcon,
  BankIcon,
  CloseIcon,
} from "../common/admin/AdminIcons";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
}

const amountTiers = [25, 50, 100];
const bankDetails = {
  accountName: "Hope Behind Bars Org.",
  accountNumber: "1000123456789",
  bank: "Commercial Bank of Ethiopia",
};

const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  initialAmount,
}) => {
  const [activeTab, setActiveTab] = useState<"card" | "local">("card");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">(
    "one-time"
  );
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialAmount && amountTiers.includes(initialAmount)) {
        setSelectedAmount(initialAmount);
        setCustomAmount("");
      } else if (initialAmount) {
        setCustomAmount(initialAmount.toString());
        setSelectedAmount(0);
      } else {
        setSelectedAmount(50);
        setCustomAmount("");
      }
      setError(null);
      setActiveTab("card");
    }
  }, [isOpen, initialAmount]);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);
    const amountToDonate = customAmount
      ? parseFloat(customAmount)
      : selectedAmount;

    if (!amountToDonate || amountToDonate < 1) {
      setError("Please enter a valid donation amount.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "/api/payments/create-checkout-session",
        { amount: amountToDonate, frequency }
      );
      const { id: sessionId } = response.data;
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          toast.error(error.message || "Could not redirect to Stripe.");
        }
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || "Donation failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      toast.success("Account number copied!");
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close donation modal"
        >
          <CloseIcon />
        </button>
        <div className="p-8 pb-0 flex-shrink-0">
          <h2 className="font-display text-3xl font-bold text-brand-dark-gray text-center">
            Make a Donation
          </h2>
          <p className="mt-2 text-gray-600 text-center">
            Your support helps us restore dignity and hope.
          </p>
          <div className="mt-8 grid grid-cols-2 border-b">
            <button
              onClick={() => setActiveTab("card")}
              className={`flex items-center justify-center py-3 font-semibold transition-all duration-300 ${
                activeTab === "card"
                  ? "text-brand-sky-blue border-b-2 border-brand-sky-blue"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <CreditCardIcon /> Card / PayPal
            </button>
            <button
              onClick={() => setActiveTab("local")}
              className={`flex items-center justify-center py-3 font-semibold transition-all duration-300 ${
                activeTab === "local"
                  ? "text-brand-sky-blue border-b-2 border-brand-sky-blue"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <BankIcon /> Local Transfer
            </button>
          </div>
        </div>
        <div className="p-8 overflow-y-auto">
          {activeTab === "card" && (
            <div>
              <div className="grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setFrequency("one-time")}
                  className={`py-2 rounded-md font-semibold text-sm transition ${
                    frequency === "one-time"
                      ? "bg-white shadow"
                      : "text-gray-500"
                  }`}
                >
                  One-Time
                </button>
                <button
                  onClick={() => setFrequency("monthly")}
                  className={`py-2 rounded-md font-semibold text-sm transition ${
                    frequency === "monthly"
                      ? "bg-white shadow"
                      : "text-gray-500"
                  }`}
                >
                  Monthly
                </button>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {amountTiers.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`py-3 rounded-lg font-bold border-2 transition ${
                      selectedAmount === amount && !customAmount
                        ? "bg-brand-sky-blue/10 border-brand-sky-blue"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Or enter a custom amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
                className="mt-4 w-full rounded-lg border-2 border-gray-200 p-3 text-center font-bold focus:ring-brand-sky-blue focus:border-brand-sky-blue"
              />
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="mt-6 w-full bg-brand-sky-blue text-white font-bold py-4 rounded-lg text-lg hover:bg-brand-sky-blue/90 transition disabled:opacity-50"
              >
                {isLoading ? "Processing..." : `Donate with Card or PayPal`}
              </button>
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
              )}
            </div>
          )}
          {activeTab === "local" && (
            <div className="space-y-4 text-center">
              <p className="text-sm font-bold text-gray-700">
                For Local Bank Transfers (Ethiopia)
              </p>
              <div className="text-sm text-left text-gray-600 bg-gray-100 p-4 rounded-md">
                <p>
                  <strong>Bank:</strong> {bankDetails.bank}
                </p>
                <p>
                  <strong>A/C Name:</strong> {bankDetails.accountName}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-mono">
                    <strong>A/C:</strong> {bankDetails.accountNumber}
                  </span>
                  <button
                    onClick={() => copyToClipboard(bankDetails.accountNumber)}
                    className="text-xs font-semibold text-brand-sky-blue hover:underline bg-brand-sky-blue/10 px-2 py-1 rounded"
                  >
                    {copySuccess ? "COPIED!" : "COPY"}
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Please use this information to make a direct deposit. Thank you!
              </p>
            </div>
          )}
        </div>
        <div className="bg-gray-50 p-4 border-t mt-auto flex-shrink-0">
          <a
            href="https://gofundme.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-gray-600 hover:text-brand-sky-blue transition block text-center"
          >
            Prefer GoFundMe?{" "}
            <span className="underline">Support our campaign here →</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
