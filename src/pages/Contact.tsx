import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Mail, Facebook, CheckCircle2, Loader2 } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [state, handleSubmit] = useForm("xrbyldpz");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="glass-effect border border-border rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <p>
              Have questions, suggestions, or feedback about TextToolbox? We'd love to hear from you! Fill out the form below or reach out through our social channels.
            </p>
          </div>

          {state.succeeded ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
              <CheckCircle2 className="w-16 h-16 text-primary animate-scale-in" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Thanks for reaching out!
              </h2>
              <p className="text-muted-foreground max-w-md">
                We've received your message and will get back to you within 24-48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    autoComplete="name"
                    className="transition-all focus:border-primary"
                  />
                  <ValidationError 
                    prefix="Name" 
                    field="name"
                    errors={state.errors}
                    className="text-destructive text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    autoComplete="email"
                    className="transition-all focus:border-primary"
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-destructive text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What is this about?"
                  autoComplete="off"
                  className="transition-all focus:border-primary"
                />
                <ValidationError 
                  prefix="Subject" 
                  field="subject"
                  errors={state.errors}
                  className="text-destructive text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  required
                  rows={6}
                  className="transition-all focus:border-primary resize-none"
                />
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                  className="text-destructive text-sm"
                />
              </div>

              <Button 
                type="submit" 
                disabled={state.submitting}
                className="w-full md:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all"
                size="lg"
              >
                {state.submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          )}
          
          <div className="not-prose grid md:grid-cols-2 gap-6 mt-12 pt-8 border-t border-border">
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

          <p className="text-muted-foreground mt-8 text-sm">
            <strong>Response Time:</strong> We typically respond within 24-48 hours. For urgent issues or bug reports, please include as much detail as possible.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;