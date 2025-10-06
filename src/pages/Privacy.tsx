import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { SEO } from "@/components/SEO";

const Privacy = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy - TextToolbox | Your Data Stays Private"
        description="TextToolbox Privacy Policy: All tools run in your browser. We don't collect, store, or track your data. Complete privacy guaranteed."
        canonical="/privacy"
        keywords="privacy policy, texttoolbox privacy, no data collection, browser-based tools"
      />
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="glass-effect border border-border rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">
              <strong>Last Updated:</strong> January 2025
            </p>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Our Commitment to Privacy</h2>
              <p>
                At TextToolbox, we take your privacy seriously. This Privacy Policy explains how we handle your data when you use our text manipulation tools. The short version: we don't collect, store, or transmit any of your text data. Everything happens in your browser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Data We DO NOT Collect</h2>
              <p>
                TextToolbox operates entirely client-side. This means:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We do not collect, store, or process any text you enter into our tools</li>
                <li>We do not track what tools you use or how often you use them</li>
                <li>We do not store your IP address, location, or browser information</li>
                <li>We do not use cookies for tracking or analytics purposes</li>
                <li>Your text never leaves your device - all processing happens locally in your browser</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">How Our Tools Work</h2>
              <p>
                Every tool on TextToolbox uses JavaScript that runs directly in your web browser. When you paste text into our word counter, format JSON, or use any other tool, the processing happens on your device. Your data is never sent to our servers or any third-party services. This architecture ensures complete privacy and allows the tools to work even when you're offline.
              </p>
              <p>
                Think of it like using a calculator on your phone - the calculations happen on your device, not on someone else's computer. That's exactly how TextToolbox works, but for text manipulation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Local Storage</h2>
              <p>
                We use your browser's local storage only for remembering your theme preference (dark mode or light mode). This setting is stored locally on your device and is not transmitted to our servers. You can clear this at any time by clearing your browser's local storage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Services</h2>
              <p>
                TextToolbox does not use any third-party analytics services, advertising networks, or tracking pixels. We don't use Google Analytics, Facebook Pixel, or any similar services. The only external resources we load are:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Font files (for displaying text properly)</li>
                <li>Icon libraries (for user interface elements)</li>
              </ul>
              <p>
                These resources do not track you or collect any personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Cookies</h2>
              <p>
                We do not use cookies. The only data stored in your browser is your theme preference (dark/light mode), which is saved in local storage, not in cookies. This preference never leaves your device.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Your Rights</h2>
              <p>
                Since we don't collect any personal data, there's no data for you to request, modify, or delete. Your text processing happens entirely on your device, giving you complete control. You can:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use our tools without creating an account</li>
                <li>Clear your browser's local storage at any time to remove theme preferences</li>
                <li>Use the tools offline once the page is loaded</li>
                <li>Block JavaScript (though this will prevent the tools from functioning)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Security</h2>
              <p>
                Because all processing happens in your browser and we don't transmit or store your data, the security of your text is entirely in your hands. We recommend:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Using a secure, updated web browser</li>
                <li>Being cautious when using public computers</li>
                <li>Clearing your browser history if you've processed sensitive information on a shared device</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Children's Privacy</h2>
              <p>
                Our tools are suitable for all ages. Since we don't collect any personal information, there are no special considerations for children using our service. Parents can feel confident that no data about their children is being collected or stored.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Policy</h2>
              <p>
                If we ever change how we handle data (though we don't anticipate doing so given our client-side architecture), we will update this policy and note the change at the top of this page. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or how TextToolbox works, please contact us through our{" "}
                <a href="/contact" className="text-primary hover:underline">Contact page</a> or reach out to Mohamed Khalifa on{" "}
                <a
                  href="https://www.facebook.com/moekhalifa8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Facebook
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
    </>
  );
};

export default Privacy;