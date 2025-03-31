import React from "react";

const Privacy = () => {
  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            At Martian Horse, we prioritize your privacy. This policy explains
            how we collect, use, and protect your personal information when you
            engage with our website and services.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Effective Date: March 31, 2025
          </p>
        </header>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="space-y-10 text-gray-700">
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                1. Information We Collect
              </h2>
              <p className="text-sm leading-relaxed">
                We collect various types of information to provide and improve
                our services:
              </p>
              <ul className="mt-2 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  <strong>Personal Details:</strong> Name, email address, phone
                  number, shipping/billing address.
                </li>
                <li>
                  <strong>Payment Information:</strong> Credit/debit card
                  details, mobile payment data (e.g., Mpesa), transaction
                  history (processed securely via third-party providers).
                </li>
                <li>
                  <strong>Account Information:</strong> Username, encrypted
                  password, order history.
                </li>
                <li>
                  <strong>Technical Data:</strong> IP address, device type,
                  browser details, and activity (via cookies and analytics).
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                2. How We Use Your Information
              </h2>
              <p className="text-sm leading-relaxed">
                Your data enables us to deliver a seamless experience and
                fulfill our obligations:
              </p>
              <ul className="mt-2 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  <strong>Order Processing:</strong> Manage purchases, payments,
                  shipping, and returns.
                </li>
                <li>
                  <strong>Customer Support:</strong> Address inquiries,
                  complaints, and provide assistance.
                </li>
                <li>
                  <strong>Marketing & Communication:</strong> Send newsletters
                  and promotions (with your opt-in consent).
                </li>
                <li>
                  <strong>Legal & Security:</strong> Comply with laws, prevent
                  fraud, and ensure site security.
                </li>
                <li>
                  <strong>Analytics:</strong> Enhance website functionality and
                  user experience.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                3. Data Protection & Security
              </h2>
              <p className="text-sm leading-relaxed">
                We employ robust measures to safeguard your information:
              </p>
              <ul className="mt-2 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  Encryption of sensitive data (e.g., payment details) during
                  transmission.
                </li>
                <li>Secure storage with restricted access protocols.</li>
                <li>
                  Regular security audits and updates to protect against
                  breaches.
                </li>
              </ul>
              <p className="mt-2 text-sm leading-relaxed">
                Despite our efforts, no online system is 100% secure; we strive
                to mitigate risks effectively.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                4. Sharing Your Information
              </h2>
              <p className="text-sm leading-relaxed">
                We do not sell or rent your data. It may be shared with:
              </p>
              <ul className="mt-2 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  <strong>Service Providers:</strong> Trusted partners like
                  payment processors (e.g., PayPal) and shipping carriers.
                </li>
                <li>
                  <strong>Legal Authorities:</strong> When required by law or to
                  protect our rights and safety.
                </li>
                <li>
                  <strong>Marketing Partners:</strong> For promotions, only with
                  your explicit consent.
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                5. Cookies & Tracking Technologies
              </h2>
              <p className="text-sm leading-relaxed">
                We use cookies and similar tools to:
              </p>
              <ul className="mt-2 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>Enhance site navigation and functionality.</li>
                <li>Analyze traffic and user behavior.</li>
                <li>
                  Personalize content and ads (optional, based on consent).
                </li>
              </ul>
              <p className="mt-2 text-sm leading-relaxed">
                Adjust preferences in your browser to disable cookies, though
                this may limit some features.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                6. Your Rights
              </h2>
              <p className="text-sm leading-relaxed">
                You have control over your data, including the right to:
              </p>
              <ul className="mt-2 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>Access or request a copy of your personal information.</li>
                <li>Correct inaccurate or incomplete data.</li>
                <li>
                  Delete your data (subject to legal retention requirements).
                </li>
                <li>Opt out of marketing communications at any time.</li>
                <li>
                  For Kenyan Residents: Exercise rights under the Data
                  Protection Act, 2019, including the right to access, rectify,
                  and erase personal data, as well as object to processing for
                  direct marketing.
                </li>
              </ul>
              <p className="mt-2 text-sm leading-relaxed">
                Email us at{" "}
                <a
                  href="mailto:support@martianhorse.com"
                  className="text-blue-600 hover:underline"
                >
                  support@martianhorse.com
                </a>{" "}
                to exercise these rights.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                7. Data Retention
              </h2>
              <p className="text-sm leading-relaxed">
                We keep your data only as long as needed:
              </p>
              <ul className="mt-2 text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>
                  To fulfill orders and provide support (e.g., 30 days
                  post-delivery for returns).
                </li>
                <li>
                  To comply with tax and legal obligations (up to 7 years).
                </li>
                <li>
                  Inactive accounts are deleted after 5 years unless otherwise
                  required.
                </li>
              </ul>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                8. Changes to This Privacy Policy
              </h2>
              <p className="text-sm leading-relaxed">
                We may revise this policy as needed. Updates will be posted here
                with a new effective date. Continued use of our services after
                changes implies acceptance.
              </p>
            </div>

            {/* Contact Section */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                9. Contact Information
              </h2>
              <p className="text-sm leading-relaxed">
                Questions or concerns? Reach out to us:
              </p>
              <ul className="mt-2 text-sm leading-relaxed space-y-2">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@martianhorse.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@martianhorse.com
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </li>
                <li>
                  <strong>Address:</strong> 123 Martian Lane, Lunar City, MC
                  90210
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-gray-500">
          © 2025 Martian Horse. All Rights Reserved.
        </footer>
      </div>
    </section>
  );
};

export default Privacy;
