import { useState } from 'react';

function ContactForm({ onSubmit, onBack, gradeLabel }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please tell us your name!';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number!';
    } else if (!/^[\d\s\-+()]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number!';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email!';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-float">🎁</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Almost There!
          </h1>
          <p className="text-violet-200">
            Tell us about yourself to claim your gift
          </p>
          {gradeLabel && (
            <div className="mt-3 inline-block px-4 py-1 rounded-full bg-violet-500/20 border border-violet-400/30">
              <span className="text-violet-300 text-sm">📚 {gradeLabel}</span>
            </div>
          )}
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-violet-500/30 shadow-xl shadow-violet-500/10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-violet-200 text-sm font-medium mb-2">
                👋 Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`w-full px-4 py-3 bg-slate-700/50 border-2 rounded-xl text-white placeholder-violet-300/50 focus:outline-none focus:border-violet-400 transition-colors ${
                  errors.name ? 'border-red-400' : 'border-violet-500/30'
                }`}
              />
              {errors.name && (
                <p className="mt-2 text-red-400 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-violet-200 text-sm font-medium mb-2">
                📱 Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={`w-full px-4 py-3 bg-slate-700/50 border-2 rounded-xl text-white placeholder-violet-300/50 focus:outline-none focus:border-violet-400 transition-colors ${
                  errors.phone ? 'border-red-400' : 'border-violet-500/30'
                }`}
              />
              {errors.phone && (
                <p className="mt-2 text-red-400 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-violet-200 text-sm font-medium mb-2">
                📧 Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={`w-full px-4 py-3 bg-slate-700/50 border-2 rounded-xl text-white placeholder-violet-300/50 focus:outline-none focus:border-violet-400 transition-colors ${
                  errors.email ? 'border-red-400' : 'border-violet-500/30'
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-red-400 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Privacy Note */}
            <div className="bg-cyan-500/10 rounded-xl p-3 border border-cyan-500/20">
              <p className="text-cyan-300/80 text-xs text-center">
                🔒 Your info is safe with us! We only use it to contact you about your gift.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-pink-500 to-violet-500 text-white text-lg font-bold rounded-xl hover:from-amber-600 hover:via-pink-600 hover:to-violet-600 transition-all shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50"
            >
              🎉 Claim My Gift!
            </button>

            {/* Back Button */}
            <button
              type="button"
              onClick={onBack}
              className="w-full py-3 text-violet-300/70 hover:text-violet-200 transition-colors text-sm"
            >
              ← Go Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
