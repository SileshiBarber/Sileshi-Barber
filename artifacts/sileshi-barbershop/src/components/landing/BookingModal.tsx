import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, Phone, ChevronDown } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  "Standard Haircut",
  "Skin Fade / Zero Fade",
  "Buzz Cut",
  "Buzz Cut + Line Up",
  "Beard Trim & Line Up",
  "Hot Towel Shave",
  "Haircut + Beard Trim Combo",
  "Kids / Students Cut",
];

const inputClass =
  "w-full bg-[#0B0C10] border border-white/10 text-white rounded-lg px-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/60 focus:border-transparent transition-all";

const labelClass = "block text-xs font-semibold text-[#C5C6C7] uppercase tracking-widest mb-1.5";

export function BookingModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const reset = () => {
    setName(""); setPhone(""); setService("");
    setDate(""); setTime(""); setError(""); setSubmitted(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim() || !service || !date || !time) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    // Validate time — must be before 21:00
    const [hourStr, minStr] = time.split(":");
    const hour = parseInt(hourStr, 10);
    const min = parseInt(minStr, 10);
    if (hour > 21 || (hour === 21 && min > 0)) {
      setError("Sileshi Barbershop closes at 9:00 PM. Please select an earlier slot.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-[#0B0C10]/85 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="bg-[#1F2833] text-white rounded-2xl border border-white/10 w-full max-w-lg overflow-hidden shadow-2xl"
            data-testid="modal-booking"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div>
                <p className="text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-0.5">
                  Sileshi Barbershop
                </p>
                <h2 className="text-white font-black text-xl tracking-tight">
                  Request Your Slot
                </h2>
              </div>
              <button
                onClick={handleClose}
                data-testid="button-modal-close"
                className="text-white/40 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                aria-label="Close booking modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="flex flex-col gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="booking-name" className={labelClass}>Full Name</label>
                      <input
                        id="booking-name"
                        type="text"
                        placeholder="e.g. James Okafor"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass}
                        data-testid="input-booking-name"
                        autoComplete="name"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="booking-phone" className={labelClass}>Phone Number</label>
                      <input
                        id="booking-phone"
                        type="tel"
                        placeholder="e.g. 0412 345 678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={inputClass}
                        data-testid="input-booking-phone"
                        autoComplete="tel"
                        inputMode="tel"
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label htmlFor="booking-service" className={labelClass}>Service</label>
                      <div className="relative">
                        <select
                          id="booking-service"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                          data-testid="select-booking-service"
                        >
                          <option value="" disabled>Select a service…</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="booking-date" className={labelClass}>Date</label>
                        <input
                          id="booking-date"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className={`${inputClass} [color-scheme:dark]`}
                          data-testid="input-booking-date"
                        />
                      </div>
                      <div>
                        <label htmlFor="booking-time" className={labelClass}>Preferred Time</label>
                        <input
                          id="booking-time"
                          type="time"
                          value={time}
                          onChange={(e) => { setTime(e.target.value); setError(""); }}
                          min="09:00"
                          max="21:00"
                          className={`${inputClass} [color-scheme:dark]`}
                          data-testid="input-booking-time"
                        />
                      </div>
                    </div>

                    {/* Error banner */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm px-4 py-3 rounded-lg"
                          data-testid="text-booking-error"
                          role="alert"
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button
                      type="submit"
                      data-testid="button-booking-submit"
                      className="w-full bg-[#C5A059] hover:bg-[#b38f4b] text-black font-bold py-4 rounded-lg transition-all duration-200 text-sm tracking-wide shadow-lg shadow-[#C5A059]/20 mt-1"
                    >
                      Send Booking Request
                    </button>
                  </div>
                </form>
              ) : (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col items-center text-center py-6 gap-5"
                  data-testid="section-booking-success"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <CheckCircle className="w-9 h-9 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-2xl mb-2">Request Sent!</h3>
                    <p className="text-[#C5C6C7] text-sm leading-relaxed max-w-xs mx-auto">
                      Thanks {name.split(" ")[0]}! We'll confirm your slot shortly. For instant confirmation, call us now.
                    </p>
                  </div>
                  <a
                    href="tel:+61431552770"
                    data-testid="button-success-call"
                    className="flex items-center gap-2 bg-[#C5A059] hover:bg-[#b38f4b] text-black font-bold px-8 py-4 rounded-lg transition-all duration-200 text-sm shadow-lg shadow-[#C5A059]/20 w-full justify-center"
                  >
                    <Phone className="w-4 h-4" />
                    Call 0431 552 770
                  </a>
                  <button
                    onClick={handleClose}
                    className="text-white/40 hover:text-white text-xs transition-colors underline underline-offset-2"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
