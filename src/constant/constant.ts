export const navLinks = [
    { id: 1, label: 'Home', url: '/' },
    {
      id: 2,
      label: 'Properties',
      url: '#properties',
      subLinks: [
        { id: 21, label: 'Single Property', url: '/item' },
      ],
    },
    {
      id: 3,
      label: 'Buy & Sell',
      url: '#',
      subLinks: [
        { id: 31, label: 'Buy with us', url: '/buy' },
        { id: 32, label: 'Sell with us', url: '/sell' },
        { id: 33, label: 'Home Estimator', url: '/estimate' },
      ],
    },
    {
      id: 4,
      label: 'More',
      url: '#',
      subLinks: [
        { id: 41, label: 'About Us', url: '/about' },
        { id: 42, label: 'Contact us', url: '/contact' },
        { id: 43, label: 'FAQs', url: '/faqs' },
      ],
    },
    
    { id: 5, label: 'Pre-Con', url: '/pre-con' },
    { id: 6, label: 'Agents', url: '/agents' },
];