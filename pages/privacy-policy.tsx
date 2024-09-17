import Head from 'next/head';
import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Upcoming Wipes</title>
        <meta
          name="description"
          content="Privacy Policy for Upcoming Wipes - Your Rust server finder"
        />
      </Head>
      <div className="min-h-screen bg-black-800 flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-12">
          <Link href="/" className="text-primary hover:text-white transition duration-300 mb-8 inline-block">
            &larr; Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>

          <div className="space-y-6 text-white">
            <p>Last updated: August 18, 2024</p>

            <p>
              Welcome to Upcoming Wipes ("we", "our", or "us"). We respect your
              privacy and are committed to protecting your personal data.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              1. Information We Collect
            </h2>
            <p>We may collect and process the following data:</p>
            <ul className="list-disc pl-6">
              <li>Usage Data: Information on how you use our website.</li>
              <li>Preferences: Your preferences and interests related to our services.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <p>We use your data to:</p>
            <ul className="list-disc pl-6">
              <li>Provide and maintain our service</li>
              <li>Improve and personalize your experience</li>
              <li>Communicate with you about updates or changes to our service</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              3. Data Security
            </h2>
            <p>
              We implement appropriate security measures to protect your personal information.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              4. Your Rights
            </h2>
            <p>You have the right to access, correct, or delete your personal data.</p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              5. Changes to This Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any
              changes by posting the new Privacy Policy on this page.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              6. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: 
              upcomingwipes@gmail.com
            </p>
          </div>
        </main>

        <footer className="bg-black-900 text-white py-6">
          <div className="container mx-auto text-center">
            <Link href="/" className="hover:text-primary transition duration-300">
              Back to Home
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PrivacyPolicy;
