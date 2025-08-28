import React from 'react';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dhaba-charcoal via-dhaba-premium-black to-dhaba-charcoal pt-20 sm:pt-24 lg:pt-28">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex justify-center mb-3 sm:mb-4 lg:mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-dhaba-gold rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-dhaba-charcoal" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-dhaba-cream mb-3 sm:mb-4 lg:mb-6 px-2">Privacy Policy</h1>
          <p className="text-dhaba-cream/80 text-sm sm:text-base lg:text-lg xl:text-xl max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-dhaba-gold text-xs sm:text-sm lg:text-base mt-2 sm:mt-3">Last updated: December 2024</p>
        </div>

        {/* Content */}
        <div className="max-w-4xl lg:max-w-5xl mx-auto">
          <div className="dhaba-card bg-dhaba-charcoal/60 border-dhaba-gold/30 p-4 sm:p-6 lg:p-8 xl:p-10">
            
            {/* Information We Collect */}
            <section className="mb-6 sm:mb-8 lg:mb-10">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4 lg:mb-6">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-dhaba-gold flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream">Information We Collect</h2>
              </div>
              <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-dhaba-cream/80">
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-medium text-dhaba-cream mb-2 sm:mb-3">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                    <li>Name, email address, and phone number when you make a reservation or contact us</li>
                    <li>Dietary preferences and special requirements</li>
                    <li>Delivery addresses for online orders</li>
                    <li>Payment information (processed securely through our payment partners)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-medium text-dhaba-cream mb-2 sm:mb-3">Usage Information</h3>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                    <li>Website usage data and analytics</li>
                    <li>Device information and IP addresses</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="mb-6 sm:mb-8 lg:mb-10">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4 lg:mb-6">
                <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-dhaba-gold flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream">How We Use Your Information</h2>
              </div>
              <div className="space-y-2 sm:space-y-3 text-dhaba-cream/80">
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                  <li>To process your orders, reservations, and provide customer service</li>
                  <li>To send you important updates about your orders and reservations</li>
                  <li>To improve our services and website functionality</li>
                  <li>To send marketing communications (with your consent)</li>
                  <li>To comply with legal obligations and prevent fraud</li>
                  <li>To analyze website usage and improve user experience</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-6 sm:mb-8 lg:mb-10">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4 lg:mb-6">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-dhaba-gold flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream">Information Sharing and Security</h2>
              </div>
              <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-dhaba-cream/80">
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-medium text-dhaba-cream mb-2 sm:mb-3">We Do Not Sell Your Data</h3>
                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed">We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-medium text-dhaba-cream mb-2 sm:mb-3">Limited Sharing</h3>
                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed mb-2">We may share your information only in these circumstances:</p>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                    <li>With payment processors to complete transactions</li>
                    <li>With delivery partners for order fulfillment</li>
                    <li>When required by law or to protect our rights</li>
                    <li>With your explicit consent</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-medium text-dhaba-cream mb-2 sm:mb-3">Security Measures</h3>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                    <li>SSL encryption for all data transmission</li>
                    <li>Secure servers with regular security updates</li>
                    <li>Limited access to personal information on a need-to-know basis</li>
                    <li>Regular security audits and monitoring</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-6 sm:mb-8 lg:mb-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream mb-3 sm:mb-4 lg:mb-6">Your Rights and Choices</h2>
              <div className="space-y-2 sm:space-y-3 text-dhaba-cream/80">
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Disable cookies through your browser settings</li>
                  <li>Request a copy of your data</li>
                </ul>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-6 sm:mb-8 lg:mb-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream mb-3 sm:mb-4 lg:mb-6">Cookies and Tracking</h2>
              <div className="space-y-2 sm:space-y-3 text-dhaba-cream/80">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">We use cookies to enhance your experience on our website:</p>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                  <li>Essential cookies for website functionality</li>
                  <li>Analytics cookies to understand website usage</li>
                  <li>Preference cookies to remember your settings</li>
                </ul>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">You can control cookies through your browser settings.</p>
              </div>
            </section>

            {/* Data Retention */}
            <section className="mb-6 sm:mb-8 lg:mb-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream mb-3 sm:mb-4 lg:mb-6">Data Retention</h2>
              <div className="space-y-2 sm:space-y-3 text-dhaba-cream/80">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">We retain your information for as long as necessary to:</p>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                  <li>Provide our services and fulfill orders</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and prevent fraud</li>
                </ul>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">You can request deletion of your data at any time by contacting us.</p>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream mb-3 sm:mb-4 lg:mb-6">Contact Us</h2>
              <div className="space-y-2 sm:space-y-3 text-dhaba-cream/80">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                  <p>Email: privacy@familydhaba.com</p>
                  <p>Phone: +91 98765-43210</p>
                  <p>Address: 123 Delhi Road, Sector 45, Gurgaon, Haryana 122001</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;