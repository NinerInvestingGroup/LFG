import { Metadata } from 'next'
import { LegalPageLayout } from '@/components/legal/legal-page-layout'

export const metadata: Metadata = {
  title: 'Privacy Policy | LFG Travel Platform',
  description: 'Privacy Policy for LFG Travel Platform - how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="January 2024"
      effectiveDate="January 1, 2024"
    >
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Introduction</h2>
          <p className="text-neutral-700 leading-relaxed">
            LFG Travel Platform ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our travel planning and coordination platform.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Information We Collect</h2>
          
          <h3 className="text-lg font-semibold text-neutral-900 mb-3">Personal Information</h3>
          <p className="text-neutral-700 leading-relaxed mb-4">
            We collect information you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-6">
            <li>Name, email address, and contact information</li>
            <li>Profile information and travel preferences</li>
            <li>Travel plans, itineraries, and trip details</li>
            <li>Photos and content you share on the platform</li>
            <li>Communications with other users and customer support</li>
            <li>Payment information (processed securely by third-party providers)</li>
          </ul>

          <h3 className="text-lg font-semibold text-neutral-900 mb-3">Automatically Collected Information</h3>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700">
            <li>Device information (IP address, browser type, operating system)</li>
            <li>Usage data (pages visited, features used, time spent)</li>
            <li>Location information (with your permission)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. How We Use Your Information</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700">
            <li>Provide, maintain, and improve our travel planning services</li>
            <li>Process transactions and manage your account</li>
            <li>Connect you with other travelers and facilitate group planning</li>
            <li>Send you updates, notifications, and promotional communications</li>
            <li>Provide customer support and respond to your inquiries</li>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Ensure platform security and prevent fraud</li>
            <li>Comply with legal obligations and enforce our terms</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Information Sharing and Disclosure</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            We may share your information in the following circumstances:
          </p>
          
          <h3 className="text-lg font-semibold text-neutral-900 mb-3">With Other Users</h3>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-4">
            <li>Profile information visible to other platform users</li>
            <li>Trip details shared with your travel group members</li>
            <li>Photos and content you choose to share publicly</li>
          </ul>

          <h3 className="text-lg font-semibold text-neutral-900 mb-3">With Service Providers</h3>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-4">
            <li>Payment processors for transaction handling</li>
            <li>Cloud hosting and data storage providers</li>
            <li>Analytics and marketing service providers</li>
            <li>Customer support and communication tools</li>
          </ul>

          <h3 className="text-lg font-semibold text-neutral-900 mb-3">For Legal Requirements</h3>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700">
            <li>To comply with applicable laws and regulations</li>
            <li>To respond to legal requests and court orders</li>
            <li>To protect our rights, property, and safety</li>
            <li>To prevent fraud and ensure platform security</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Data Security</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            We implement appropriate technical and organizational measures to protect your personal information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700">
            <li>Encryption of data in transit and at rest</li>
            <li>Secure authentication and access controls</li>
            <li>Regular security assessments and updates</li>
            <li>Staff training on data protection practices</li>
            <li>Incident response procedures for data breaches</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Your Rights and Choices</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            You have the following rights regarding your personal information:
          </p>
          
          <h3 className="text-lg font-semibold text-neutral-900 mb-3">Access and Control</h3>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-4">
            <li>Access and update your account information</li>
            <li>Download a copy of your personal data</li>
            <li>Delete your account and associated data</li>
            <li>Control privacy settings and visibility</li>
          </ul>

          <h3 className="text-lg font-semibold text-neutral-900 mb-3">Communication Preferences</h3>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-4">
            <li>Opt out of promotional emails and notifications</li>
            <li>Manage push notification settings</li>
            <li>Control marketing communications</li>
          </ul>

          <h3 className="text-lg font-semibold text-neutral-900 mb-3">GDPR Rights (EU Users)</h3>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700">
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Cookies and Tracking Technologies</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            We use cookies and similar technologies to enhance your experience:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700">
            <li>Essential cookies for platform functionality</li>
            <li>Analytics cookies to understand usage patterns</li>
            <li>Marketing cookies for personalized content</li>
            <li>Social media cookies for sharing features</li>
          </ul>
          <p className="text-neutral-700 leading-relaxed mt-4">
            You can control cookie preferences through your browser settings or our cookie management tool.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. International Data Transfers</h2>
          <p className="text-neutral-700 leading-relaxed">
            Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data during international transfers, including standard contractual clauses and adequacy decisions.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Data Retention</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            We retain your personal information for as long as necessary to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700">
            <li>Provide our services and maintain your account</li>
            <li>Comply with legal obligations and resolve disputes</li>
            <li>Improve our services and user experience</li>
            <li>Prevent fraud and ensure platform security</li>
          </ul>
          <p className="text-neutral-700 leading-relaxed mt-4">
            When you delete your account, we will remove your personal information within 30 days, except where retention is required by law.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. Children's Privacy</h2>
          <p className="text-neutral-700 leading-relaxed">
            Our platform is not intended for users under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">11. Third-Party Links and Services</h2>
          <p className="text-neutral-700 leading-relaxed">
            Our platform may contain links to third-party websites and integrate with external services. This Privacy Policy does not apply to these third-party services. We encourage you to review the privacy policies of any third-party services you access through our platform.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">12. Changes to This Privacy Policy</h2>
          <p className="text-neutral-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by email or through our platform. The updated policy will be effective when posted, and your continued use of the platform constitutes acceptance of the changes.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">13. Contact Us</h2>
          <p className="text-neutral-700 leading-relaxed mb-4">
            If you have questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
            <p className="font-medium text-neutral-900">LFG Travel Platform - Privacy Team</p>
            <p className="text-neutral-700">Email: privacy@lfgetaway.com</p>
            <p className="text-neutral-700">Support: support@lfgetaway.com</p>
            <p className="text-neutral-700">Legal: legal@lfgetaway.com</p>
          </div>
          <p className="text-neutral-700 leading-relaxed mt-4">
            For GDPR-related inquiries, you may also contact your local data protection authority.
          </p>
        </div>
      </section>
    </LegalPageLayout>
  )
}