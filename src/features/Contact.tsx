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
    <div className="h-full flex flex-col z-10 relative overflow-hidden">
      <div className="max-w-3xl mx-auto w-full h-full flex flex-col">
        <h1 className="text-3xl md:text-5xl font-mono font-bold mb-8">Contact</h1>
        <div className="flex-1 overflow-y-auto space-y-6 text-gray-300 font-mono pr-2">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Get in Touch</h2>
            <p className="mb-6">{contactData.description}</p>
          </div>
          
          <div className="space-y-4">
            {contactData.contacts.map((contact, idx) => (
              <div
                key={idx}
                className="bg-black bg-opacity-40 backdrop-blur-sm border border-gray-800 rounded p-4 hover:border-gray-500 transition-all duration-500 ease"
              >
                <h3 className="text-lg font-bold mb-2 text-white">{contact.label}</h3>
                <a
                  href={getContactHref(contact)}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-gray-300 hover:text-white transition-colors"
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
