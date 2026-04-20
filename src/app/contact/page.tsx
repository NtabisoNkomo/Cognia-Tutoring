"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Get in touch with the Cognia Tutoring team for any questions or support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          <div className="bg-surface border border-border-glow p-8 md:p-12 rounded-2xl shadow-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input type="text" required className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl focus:outline-none focus:border-accent text-foreground" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input type="email" required className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl focus:outline-none focus:border-accent text-foreground" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea required rows={5} className="w-full px-4 py-3 bg-background border border-border-glow rounded-xl focus:outline-none focus:border-accent text-foreground resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-md">
                  Send Message
                </button>
              </form>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent</h3>
                <p className="text-text-secondary">We will get back to you shortly.</p>
              </div>
            )}
          </div>

          <div className="space-y-8">
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-4 rounded-xl text-primary"><MapPin className="h-6 w-6" /></div>
                <div>
                   <h3 className="text-lg font-bold text-foreground">Office Location</h3>
                   <p className="text-text-secondary mt-1">123 Education Drive<br />Silicon Valley<br />Johannesburg, South Africa</p>
                </div>
             </div>
             
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-4 rounded-xl text-primary"><Mail className="h-6 w-6" /></div>
                <div>
                   <h3 className="text-lg font-bold text-foreground">Email Support</h3>
                   <p className="text-text-secondary mt-1">support@cogniatutoring.co.za</p>
                </div>
             </div>

             <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-4 rounded-xl text-primary"><Phone className="h-6 w-6" /></div>
                <div>
                   <h3 className="text-lg font-bold text-foreground">Direct Line</h3>
                   <p className="text-text-secondary mt-1">+27 (0) 11 123 4567</p>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
