export const navLinks = [
    // { id: 1, label: 'Home', url: '/' },
    {
      id: 1,
      label: 'Listings',
      url: '/listings',
    },
    {
      id: 2,
      label: 'Map Search',
      url: '/map-search',
    },
    {
      id: 3,
      label: 'Buy & Sell',
      url: '#',
      subLinks: [
        { id: 31, label: 'Buy with us', url: '/buy' },
        { id: 32, label: 'Sell with us', url: '/sell' },
        { id: 33, label: 'Home Estimator', url: '/home-estimation' },
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
    {
      id: 5,
      label: 'Tools',
      url: '#',
      subLinks: [
        { id: 51, label: 'Down Payment Calculator', url: '/down-payment-calculator' },
      ],
    },
    
    { id: 6, label: 'Pre-Con', url: '/pre-con' },
    { id: 7, label: 'Find a Realtor', url: '/agents' },
];