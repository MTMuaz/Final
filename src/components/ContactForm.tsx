import React, { useState } from 'react';
import {
  Mail,
  Send,
  User,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Facebook,
  Twitter,
  Github,
  MessageCircle
} from 'lucide-react';
import emailjs from 'emailjs-com';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration
      const serviceId = 'service_mwz2a9c';
      const templateId = 'template_hhafxmg';
      const publicKey = 'vhwQZeiu3nFVO3mpP';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'ISS 25 Explorer Team',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setStatusMessage('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
      setStatusMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const subjectOptions = [
    'General Inquiry',
    'Technical Support',
    'Feature Request',
    'Bug Report',
    'Partnership Opportunity',
    'Educational Content',
    'Media Inquiry',
    'Other'
  ];

  return (
    <div className="relative z-10 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Have questions about the ISS, need technical support, or want to collaborate? 
            We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Mail className="w-6 h-6 text-cyan-400 mr-3" />
                Send us a Message
              </h2>

              {/* Status Message */}
              {submitStatus !== 'idle' && (
                <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                  submitStatus === 'success' 
                    ? 'bg-green-500/20 border border-green-500/30' 
                    : 'bg-red-500/20 border border-red-500/30'
                }`}>
                  {submitStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  )}
                  <p className={`text-sm ${
                    submitStatus === 'success' ? 'text-green-300' : 'text-red-300'
                  }`}>
                    {statusMessage}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    {subjectOptions.map((option) => (
                      <option key={option} value={option} className="bg-slate-800">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors resize-vertical"
                      placeholder="Tell us about your inquiry, feedback, or how we can help you..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <a
                      href="mailto:tahmidmuaz50@gmail.com"
                      className="text-slate-300 text-sm hover:text-cyan-400 transition-colors"
                    >
                      tahmidmuaz50@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <a
                      href="tel:+8801744799261"
                      className="text-slate-300 text-sm hover:text-purple-400 transition-colors"
                    >
                      +880 1744 799261
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Facebook className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Facebook Page</div>
                    <a
                      href="https://www.facebook.com/profile.php?id=61581429201964"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 text-sm hover:text-blue-400 transition-colors"
                    >
                      Team Explorer BD
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Response Time</div>
                    <div className="text-slate-300 text-sm">Within 24 hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">How accurate is the ISS tracking?</h4>
                  <p className="text-slate-300 text-sm">Our ISS tracker uses real-time data from NASA APIs to provide accurate position updates every few seconds.</p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Are the games educational?</h4>
                  <p className="text-slate-300 text-sm">Yes! All games are designed to teach real space science concepts and ISS operations through interactive gameplay.</p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Can I contribute content?</h4>
                  <p className="text-slate-300 text-sm">We welcome contributions! Contact us about educational content, translations, or technical improvements.</p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Is this officially endorsed by NASA?</h4>
                  <p className="text-slate-300 text-sm">This is an independent project created for the NASA Space Apps Challenge 2025, using publicly available NASA data and resources.</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-6">Connect With Us</h3>

              <div className="space-y-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61581429201964"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="text-sm font-medium">Team Explorer BD</span>
                </a>
                <a
                  href="https://x.com/AhnafIstiakaia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-sky-500/20 text-sky-400 hover:bg-sky-500/30 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="text-sm font-medium">@AhnafIstiakaia</span>
                </a>
                <a
                  href="https://github.com/lahirahman63-gif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm font-medium">lahirahman63-gif</span>
                </a>
                <a
                  href="https://discord.com/channels/1186022404410064957/1186022404410064960"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Join Discord</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;