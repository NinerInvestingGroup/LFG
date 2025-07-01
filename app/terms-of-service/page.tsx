import { Metadata } from 'next'
import { LegalPageLayout } from '@/components/legal/legal-page-layout'

export const metadata: Metadata = {
  title: 'Terms of Service | LFG Travel Platform',
  description: 'Terms of Service for LFG Travel Platform - group travel planning and coordination services.',
}

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="January 2024"
      effectiveDate="January 1, 2024"
    >
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-neutral-700 leading-relaxed">
            By accessing and using the LFG Travel Platform ("Platform"), you accept and agree to be bound by the terms and provision of this agreement. LFG Travel Platform is a service that facilitates group travel planning, coordination, and social networking for travelers.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Description of Service</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            LFG Travel Platform provides:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700">
            <li>Group travel planning and coordination tools</li>
            <li>Social networking features for connecting with fellow travelers</li>
            <li>Trip organization and expense management</li>
            <li>Community features for sharing travel experiences</li>
            <li>Integration with third-party travel services and booking platforms</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. User Accounts and Registration</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            To access certain features of the Platform, you must register for an account. You agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700">
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Maintain and update your account information</li>
            <li>Keep your password secure and confidential</li>
            <li>Be responsible for all activities under your account</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. User Conduct</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            You agree not to use the Platform to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700">
            <li>Violate any applicable laws or regulations</li>
            <li>Impersonate any person or entity or misrepresent your affiliation</li>
            <li>Upload, post, or transmit harmful, offensive, or inappropriate content</li>
            <li>Interfere with or disrupt the Platform or servers</li>
            <li>Attempt to gain unauthorized access to other user accounts</li>
            <li>Use the Platform for commercial purposes without authorization</li>
            <li>Spam, harass, or intimidate other users</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Travel and Booking Disclaimers</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            Important travel-related disclaimers:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700">
            <li>LFG Travel Platform is a planning and coordination tool, not a travel agency</li>
            <li>We do not guarantee the availability, quality, or safety of accommodations, transportation, or activities</li>
            <li>Users are responsible for their own travel arrangements and bookings</li>
            <li>We recommend purchasing travel insurance for all trips</li>
            <li>Users must comply with all applicable travel requirements, including visas, vaccinations, and restrictions</li>
            <li>Travel involves inherent risks, and users participate at their own risk</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Third-Party Services</h2>
          <p className="text-neutral-700 leading-relaxed">
            Our Platform may integrate with third-party services such as booking platforms, payment processors, and mapping services. We are not responsible for the availability, content, or practices of these third-party services. Your use of third-party services is subject to their respective terms and conditions.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Payment and Fees</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            Currently, LFG Travel Platform is free to use. However, we reserve the right to introduce fees for certain premium features in the future. Any fees will be clearly communicated before implementation.
          </p>
          <p className="text-neutral-700 leading-relaxed">
            For group expenses and payments handled through the Platform, we may integrate with third-party payment processors. Users are responsible for any fees charged by these services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Intellectual Property</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            The Platform and its content, features, and functionality are owned by LFG Travel Platform and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
          <p className="text-neutral-700 leading-relaxed">
            You retain ownership of content you submit to the Platform but grant us a license to use, display, and distribute such content as necessary to provide the service.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Privacy</h2>
          <p className="text-neutral-700 leading-relaxed">
            Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and protect your information when you use the Platform.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. Limitation of Liability</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            To the fullest extent permitted by law, LFG Travel Platform shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700">
            <li>Travel disruptions, cancellations, or delays</li>
            <li>Loss of profits, data, or business opportunities</li>
            <li>Personal injury or property damage during travel</li>
            <li>Disputes between users or travel companions</li>
            <li>Third-party service failures or errors</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">11. Indemnification</h2>
          <p className="text-neutral-700 leading-relaxed">
            You agree to indemnify and hold harmless LFG Travel Platform from any claims, damages, or expenses arising from your use of the Platform, violation of these terms, or infringement of any rights of another person or entity.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">12. Termination</h2>
          <p className="text-neutral-700 leading-relaxed">
            We reserve the right to terminate or suspend your account and access to the Platform at our sole discretion, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users or the Platform.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">13. Governing Law</h2>
          <p className="text-neutral-700 leading-relaxed">
            These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction where LFG Travel Platform is incorporated, without regard to conflict of law principles.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">14. Changes to Terms</h2>
          <p className="text-neutral-700 leading-relaxed">
            We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes via email or through the Platform. Continued use of the Platform after such modifications constitutes acceptance of the updated terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">15. Contact Information</h2>
          <p className="text-neutral-700 leading-relaxed">
            For questions about these Terms of Service, please contact us at:
          </p>
          <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
            <p className="font-medium text-neutral-900">LFG Travel Platform</p>
            <p className="text-neutral-700">Email: legal@lfgetaway.com</p>
            <p className="text-neutral-700">Support: support@lfgetaway.com</p>
          </div>
        </div>
      </section>
    </LegalPageLayout>
  )
}