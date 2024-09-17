import Head from 'next/head';
import Link from 'next/link';

const TermsAndConditions = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Upcoming Wipes</title>
        <meta
          name="description"
          content="Terms and Conditions for Upcoming Wipes - Your Rust server finder"
        />
      </Head>
      <div className="min-h-screen bg-black-800 flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-12">
          <Link href="/" className="text-primary hover:text-white transition duration-300 mb-8 inline-block">
            &larr; Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-primary mb-8">Terms and Conditions</h1>

          <div className="space-y-6 text-white">
            <p>Last updated: August 18, 2024</p>

            <p>Please read these Terms and Conditions carefully before using Upcoming Wipes.</p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              2. Use of Service
            </h2>
            <p>
              You may use our service only for lawful purposes and in accordance with these Terms.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              3. Intellectual Property
            </h2>
            <p>
              The service and its original content, features, and functionality are and will remain the exclusive property of Upcoming Wipes.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              4. Termination
            </h2>
            <p>
              We may terminate or suspend your access to our service immediately, without prior notice or liability, for any reason whatsoever.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              5. Limitation of Liability
            </h2>
            <p>
              In no event shall Upcoming Wipes be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              6. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
              7. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at: 
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

export default TermsAndConditions;
