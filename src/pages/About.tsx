import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { SEO } from "@/components/SEO";

const About = () => {
  return (
    <>
      <SEO 
        title="About TextToolbox - Our Mission & Values | Free Privacy-Focused Text Tools"
        description="Learn about TextToolbox's mission to provide free, privacy-focused text manipulation tools. Created by Mohamed Khalifa. No tracking, no ads, always free."
        canonical="/about"
        keywords="about texttoolbox, mohamed khalifa, privacy text tools, free online tools"
      />
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="glass-effect border border-border rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8">About TextToolbox</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            <p>
              TextToolbox was created by Mohamed Khalifa to provide a comprehensive, privacy-focused suite of text manipulation tools that anyone can use for free. Born from the frustration of using scattered, ad-heavy tools across the web, TextToolbox brings everything together in one clean, fast interface.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
            <p>
              We believe that essential text tools should be accessible to everyone without compromising privacy or user experience. Our mission is to provide powerful, professional-grade text manipulation tools that respect your privacy, work instantly, and remain completely free.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Why We Built This</h2>
            <p>
              Every day, millions of people need to count words, convert text cases, or format code. Most existing tools are cluttered with ads, track your data, or require paid subscriptions for basic features. We built TextToolbox to be different - no ads, no tracking, no paywalls. Just pure functionality.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Privacy First:</strong> All tools run in your browser. Your data never leaves your device.</li>
              <li><strong>Always Free:</strong> No premium tiers, no feature locks, no payment required.</li>
              <li><strong>Simple & Fast:</strong> Clean interface, instant results, no unnecessary complexity.</li>
              <li><strong>Open & Transparent:</strong> We're honest about how our tools work and what we do (and don't) collect.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
};

export default About;