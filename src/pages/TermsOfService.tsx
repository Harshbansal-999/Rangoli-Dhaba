import React from 'react';
import { FileText, Users, CreditCard, AlertTriangle } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dhaba-charcoal via-dhaba-premium-black to-dhaba-charcoal pt-20 sm:pt-24 lg:pt-28">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex justify-center mb-3 sm:mb-4 lg:mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-dhaba-gold rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-dhaba-charcoal" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-dhaba-cream mb-3 sm:mb-4 lg:mb-6 px-2">Terms of Service</h1>
          <p className="text-dhaba-cream/80 text-sm sm:text-base lg:text-lg xl:text-xl max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-dhaba-gold text-xs sm:text-sm lg:text-base mt-2 sm:mt-3">Last updated: December 2024</p>
        </div>

        {/* Content */}
        <div className="max-w-4xl lg:max-w-5xl mx-auto">
          <div className="dhaba-card bg-dhaba-charcoal/60 border-dhaba-gold/30 p-4 sm:p-6 lg:p-8 xl:p-10">
            {/* Acceptance of Terms */}
            <section className="mb-6 sm:mb-8 lg:mb-10">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4 lg:mb-6">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-dhaba-gold flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream">Acceptance of Terms</h2>
              </div>
              <div className="space-y-2 sm:space-y-3 text-dhaba-cream/80">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  By accessing and using Family Dhaba's services, including our restaurant, website, online ordering, 
                  and delivery services, you agree to be bound by these Terms of Service and our Privacy Policy.
                </p>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  If you do not agree to these terms, please do not use our services.
                </p>
              </div>
            </section>

            {/* Restaurant Services */}
            <section className="mb-6 sm:mb-8 lg:mb-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream mb-3 sm:mb-4 lg:mb-6">Restaurant Services</h2>
              <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-dhaba-cream/80">
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-medium text-dhaba-cream mb-2 sm:mb-3">Dining In</h3>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                    <li>Reservations are subject to availability and may be cancelled if not confirmed</li>
                    <li>We reserve the right to limit dining time during peak hours</li>
                    <li>All guests must follow our restaurant policies and respect other diners</li>
                    <li>Management reserves the right to refuse service to anyone</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-medium text-dhaba-cream mb-2 sm:mb-3">Takeaway & Delivery</h3>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                    <li>Orders are subject to availability of ingredients and kitchen capacity</li>
                    <li>Delivery times are estimates and may vary due to weather, traffic, or high demand</li>
                    <li>We are not responsible for delays caused by incorrect addresses or contact information</li>
                    <li>Temperature and quality of food may vary during delivery</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Payment Terms */}
            <section className="mb-6 sm:mb-8 lg:mb-10">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4 lg:mb-6">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-dhaba-gold flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream">Payment Terms</h2>
              </div>
              <div className="space-y-2 sm:space-y-3 text-dhaba-cream/80">
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                  <li>All prices are in Indian Rupees (INR) and include applicable taxes</li>
                  <li>Payment is required at the time of ordering for takeaway and delivery</li>
                  <li>We accept cash, credit cards, debit cards, and digital payment methods</li>
                  <li>Prices are subject to change without notice</li>
                  <li>Service charges may apply for large groups or special events</li>
                  <li>Tips are not mandatory but are appreciated for good service</li>
                </ul>
              </div>
            </section>

            {/* Cancellation & Refund Policy */}
            <section className="mb-6 sm:mb-8 lg:mb-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream mb-3 sm:mb-4 lg:mb-6">Cancellation & Refunds</h2>
              <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-dhaba-cream/80">
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-medium text-dhaba-cream mb-2 sm:mb-3">Order Cancellations</h3>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                    <li>Orders can be cancelled within 5 minutes of placement</li>
                    <li>Once food preparation begins, orders cannot be cancelled</li>
                    <li>Reservation cancellations must be made at least 2 hours in advance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-medium text-dhaba-cream mb-2 sm:mb-3">Refunds</h3>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                    <li>Refunds are provided for cancelled orders or unsatisfactory food quality</li>
                    <li>Refund requests must be made within 24 hours of order</li>
                    <li>Refunds will be processed within 3-5 business days</li>
                    <li>No refunds for consumed food unless there's a quality issue</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Food Safety & Allergies */}
            <section className="mb-6 sm:mb-8 lg:mb-10">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4 lg:mb-6">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-dhaba-gold flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream">Food Safety & Allergies</h2>
              </div>
              <div className="space-y-2 sm:space-y-3 text-dhaba-cream/80">
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                  <li>Please inform us of any food allergies or dietary restrictions when ordering</li>
                  <li>While we take precautions, we cannot guarantee the absence of allergens</li>
                  <li>Our kitchen handles nuts, dairy, gluten, and other common allergens</li>
                  <li>We follow all local food safety regulations and maintain high hygiene standards</li>
                  <li>Customers eat at their own risk regarding allergic reactions</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-6 sm:mb-8 lg:mb-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream mb-3 sm:mb-4 lg:mb-6">Intellectual Property</h2>
              <div className="space-y-2 sm:space-y-3 text-dhaba-cream/80">
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                  <li>All content on our website, including recipes, images, and branding, is our property</li>
                  <li>You may not reproduce, distribute, or use our content without permission</li>
                  <li>Our recipes and cooking methods are proprietary</li>
                  <li>Customer reviews and photos may be used for marketing purposes</li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-6 sm:mb-8 lg:mb-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream mb-3 sm:mb-4 lg:mb-6">Limitation of Liability</h2>
              <div className="space-y-2 sm:space-y-3 text-dhaba-cream/80">
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                  <li>Our liability is limited to the cost of the meal or service provided</li>
                  <li>We are not responsible for indirect or consequential damages</li>
                  <li>We maintain appropriate insurance for our operations</li>
                  <li>Customers assume risk for any adverse reactions to food</li>
                </ul>
              </div>
            </section>

            {/* Privacy */}
            <section className="mb-6 sm:mb-8 lg:mb-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream mb-3 sm:mb-4 lg:mb-6">Privacy</h2>
              <div className="space-y-2 sm:space-y-3 text-dhaba-cream/80">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy to understand 
                  how we collect, use, and protect your personal information.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="mb-6 sm:mb-8 lg:mb-10">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream mb-3 sm:mb-4 lg:mb-6">Changes to Terms</h2>
              <div className="space-y-2 sm:space-y-3 text-dhaba-cream/80">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be posted 
                  on our website and will be effective immediately upon posting.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dhaba-cream mb-3 sm:mb-4 lg:mb-6">Contact Us</h2>
              <div className="space-y-2 sm:space-y-3 text-dhaba-cream/80">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">If you have any questions about these Terms of Service, please contact us:</p>
                <div className="space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                  <p>Email: legal@familydhaba.com</p>
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

export default TermsOfService;