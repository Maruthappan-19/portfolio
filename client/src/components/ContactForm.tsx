import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle, Copy, Check, Mail, RotateCcw } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ContactFormProps {
  idPrefix?: string;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ idPrefix = 'cf', className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    botcheck: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMailtoFallback = () => {
    const mailtoSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('');

    // Honeypot check: If bot filled the hidden field, silently fail gracefully
    if (formData.botcheck) {
      setStatus('success');
      setSubmittedData({ name: formData.name, email: formData.email });
      return;
    }

    const accessKey = PORTFOLIO_DATA.personal.web3formsAccessKey?.trim();

    // If access key is not yet configured, provide clear guidance and fall back cleanly
    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
      setStatus('error');
      setStatusMessage(
        'Cloud email service key is not configured yet. You can open your mail app or copy my address directly below.'
      );
      return;
    }

    try {
      const submissionBody = new FormData();
      submissionBody.append('access_key', accessKey);
      submissionBody.append('name', formData.name);
      submissionBody.append('email', formData.email);
      submissionBody.append('subject', formData.subject || `New Portfolio Message from ${formData.name}`);
      submissionBody.append('message', formData.message);
      submissionBody.append('from_name', `${formData.name} (Portfolio Contact)`);
      submissionBody.append('reply_to', formData.email);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submissionBody,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setSubmittedData({ name: formData.name, email: formData.email });
        setFormData({ name: '', email: '', subject: '', message: '', botcheck: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.message || 'Unable to deliver message automatically. Please try the direct email below.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network connection error. Please email directly or click the mail link below.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setStatusMessage('');
  };

  return (
    <div className={`p-6 sm:p-8 md:p-10 rounded-jameson bg-surface-card border border-surface-border ${className}`}>
      {status === 'success' && submittedData ? (
        <div className="py-8 text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shadow-[0_0_30px_rgba(189,167,115,0.25)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-light text-2xl sm:text-3xl text-white">
              Message Sent Successfully!
            </h3>
            <p className="text-text-secondary text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Thank you, <span className="text-white font-medium">{submittedData.name}</span>. Your note has been delivered directly to Maruthappan's inbox (<span className="text-accent">{PORTFOLIO_DATA.personal.email}</span>). A response will be sent to <span className="text-white font-medium">{submittedData.email}</span> shortly.
            </p>
          </div>

          <div className="pt-3">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-surface-border bg-surface-subtle text-white font-medium text-xs sm:text-sm hover:border-accent hover:text-accent transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Send another message
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="font-serif font-light text-2xl sm:text-3xl text-white mb-2">Send a Message</h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Send your message directly to my inbox. Delivered straight to Maruthappan via secure API.
            </p>
          </div>

          {status === 'error' && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/30 border border-red-800/50 text-xs sm:text-sm space-y-3">
              <div className="flex items-start gap-2.5 text-red-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{statusMessage}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-red-800/30">
                <button
                  type="button"
                  onClick={handleMailtoFallback}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900/40 hover:bg-red-900/70 text-white text-xs font-medium transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-accent" /> Open Mail App
                </button>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-subtle border border-surface-border hover:border-accent text-white text-xs font-medium transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5 text-accent" />}
                  {copied ? 'Copied Email' : 'Copy Direct Email'}
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot field for anti-spam (invisible to human visitors) */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: 'none' }}
              checked={!!formData.botcheck}
              onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked ? 'spam' : '' })}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor={`${idPrefix}-name`}
                  className="block text-xs uppercase tracking-wider font-semibold text-text-muted mb-2"
                >
                  Your Name <span className="text-accent">*</span>
                </label>
                <input
                  id={`${idPrefix}-name`}
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-surface-border text-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor={`${idPrefix}-email`}
                  className="block text-xs uppercase tracking-wider font-semibold text-text-muted mb-2"
                >
                  Your Email <span className="text-accent">*</span>
                </label>
                <input
                  id={`${idPrefix}-email`}
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@example.com"
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-surface-border text-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor={`${idPrefix}-subject`}
                className="block text-xs uppercase tracking-wider font-semibold text-text-muted mb-2"
              >
                Subject <span className="text-accent">*</span>
              </label>
              <input
                id={`${idPrefix}-subject`}
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Job Opportunity / Project Collaboration"
                disabled={status === 'loading'}
                className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-surface-border text-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor={`${idPrefix}-message`}
                className="block text-xs uppercase tracking-wider font-semibold text-text-muted mb-2"
              >
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id={`${idPrefix}-message`}
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hello Maruthappan, I'd like to discuss an opportunity regarding..."
                disabled={status === 'loading'}
                className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-surface-border text-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-accent text-black font-semibold text-sm hover:bg-accent-hover transition-all disabled:opacity-70 shadow-[0_0_20px_rgba(189,167,115,0.25)]"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Delivering Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>

              <span className="text-[11px] text-text-muted text-center sm:text-right">
                Delivers directly to {PORTFOLIO_DATA.personal.email}
              </span>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
