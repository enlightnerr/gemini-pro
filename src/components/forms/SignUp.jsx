"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { fetchCountryCodes } from "@/redux/features/countrySlice";

export default function SignupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [dialCode, setDialCode] = useState("+91");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("form");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const countryCodes = useSelector((state) => state.country.codes);
  const isLoading = useSelector((state) => state.country.loading);

  useEffect(() => {
    if (countryCodes.length === 0) {
      dispatch(fetchCountryCodes());
    }
  }, [countryCodes.length, dispatch]);

  const handleSendOtp = () => {
    if (!name || !phone) return;
    setStep("otp");
    setTimeout(() => {
      alert("OTP sent to " + dialCode + phone);
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      dispatch(login({ id: Date.now(), name, phone: dialCode + phone }));
      setIsOpen(false);
      setStep("form");
      router.push("/dashboard");
    } else {
      alert("Incorrect OTP");
    }
  };

  const filteredCodes = countryCodes.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="">
        Sign Up
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center px-4">
          <div className="bg-zinc-900 text-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Create Account</h2>

            {step === "form" ? (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 rounded bg-zinc-800 placeholder-gray-400"
                />

                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Search country"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 rounded bg-zinc-800 placeholder-gray-400"
                  />

                  <select
                    value={dialCode}
                    onChange={(e) => setDialCode(e.target.value)}
                    className="w-full p-2 rounded bg-zinc-800"
                  >
                    {isLoading && <option>Loading...</option>}
                    {!isLoading &&
                      filteredCodes.map((c, i) => (
                        <option key={i} value={c.code}>
                          {c.name} ({c.code})
                        </option>
                      ))}
                  </select>

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 rounded bg-zinc-800 placeholder-gray-400"
                  />
                </div>

                <button
                  onClick={handleSendOtp}
                  className="w-full bg-green-600 p-2 rounded"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <p>Enter OTP sent to {dialCode + phone}</p>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP (try 1234)"
                  className="w-full p-2 rounded bg-zinc-800 placeholder-gray-400"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-blue-600 p-2 rounded"
                >
                  Verify OTP
                </button>
              </>
            )}

            <button
              onClick={() => {
                setIsOpen(false);
                setStep("form");
              }}
              className="text-sm text-gray-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
