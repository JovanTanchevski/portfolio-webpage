import contactData from '../lib/data/contactData.json';

// Contact section component - contact information
function Contact() {
  const getContactHref = (contact: (typeof contactData.contacts)[0]) => {
    if (contact.useEnv) {
      const envKey = contact.useEnv as 'VITE_EMAIL' | 'VITE_PHONE' | 'VITE_CV_URL';
      const envValue = import.meta.env[envKey] as string;
      return contact.href === 'mailto' ? `mailto:${envValue || ''}` : contact.href;
    }
    return contact.href;
  };

  const getContactDisplay = (contact: (typeof contactData.contacts)[0]) => {
    if (contact.useEnv) {
      const envKey = contact.useEnv as 'VITE_EMAIL' | 'VITE_PHONE' | 'VITE_CV_URL';
      const envValue = import.meta.env[envKey] as string;
      return envValue || contact.display;
    }
    return contact.display;
  };

  return (
    <div className="h-full flex flex-col z-10 relative overflow-hidden pt-12 md:pt-0 rise-in">
      <div className="max-w-3xl mx-auto w-full h-full flex flex-col">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Contact</h1>
        <div className="flex-1 overflow-y-auto space-y-6 text-muted pr-2 pb-8">
          <div>
            <h2 className="font-mono text-sm uppercase tracking-widest text-accent mb-4">Get in Touch</h2>
            <p className="mb-2 text-fg/90 leading-relaxed">{contactData.description}</p>
          </div>
          
          <div className="space-y-4">
            {contactData.contacts.map((contact, idx) => (
              <div
                key={idx}
                className="bg-surface/70 backdrop-blur-sm border border-line rounded-xl p-5 hover:border-accent transition-colors duration-300"
              >
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted mb-2">{contact.label}</h3>
                <a
                  href={getContactHref(contact)}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-fg hover:text-accent transition-colors break-all"
                >
                  {getContactDisplay(contact)}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
