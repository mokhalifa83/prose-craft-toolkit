import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Mail, Facebook } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="glass-effect border border-border rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            <p>
              Have questions, suggestions, or feedback about TextToolbox? We'd love to hear from you! Reach out through any of the following channels:
            </p>
            
            <div className="not-prose grid gap-6 mt-8">
              <a
                href="https://www.facebook.com/moekhalifa8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-primary/10 border border-primary/20 rounded-xl hover:bg-primary/20 transition-colors"
              >
                <Facebook className="w-8 h-8 text-primary" />
                <div>
                  <div className="font-semibold text-lg">Facebook</div>
                  <div className="text-sm text-muted-foreground">Connect with Mohamed Khalifa</div>
                </div>
              </a>
              
              <div className="flex items-center gap-4 p-6 bg-card border border-border rounded-xl">
                <Mail className="w-8 h-8 text-primary" />
                <div>
                  <div className="font-semibold text-lg">Email</div>
                  <div className="text-sm text-muted-foreground">contact@texttoolbox.com</div>
                </div>
              </div>
            </div>

            <p className="mt-8">
              <strong>Response Time:</strong> We typically respond within 24-48 hours. For urgent issues or bug reports, please include as much detail as possible about the problem you're experiencing.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;