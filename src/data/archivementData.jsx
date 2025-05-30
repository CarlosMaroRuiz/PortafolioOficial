import { FiStar, FiAward, FiTarget } from 'react-icons/fi';

const achievements = [
  {
    title: 'First Place - Flecha Amarilla Track at Talent Land 2025 Genius Arena Hackathon',
    category: 'Hackathon',
    description: 'I won 1st place in the Flecha Amarilla track at the Genius Arena Hackathon during Talent Land México 2025, one of the most important innovation and technology events in the country. We developed a centralized billing solution for Flecha Amarilla, working with technologies like Angular, FastAPI, and AWS Textract to automate invoice reading and processing. Experience focused on frontend development, collaborative work, and problem-solving under pressure.',
    highlights: [
      'First place winner in Flecha Amarilla track',
      'Centralized billing solution development for Flecha Amarilla',
      'Angular, FastAPI, and AWS Textract implementation',
      'Frontend development under pressure'
    ],
    icon: <FiTarget className="h-16 w-16 text-white" />,
    images: [
      { src: '/img/talent/certificado.png', alt: 'Talent Land Certificate' },
      { src: '/img/talent/talent2.jpeg', alt: 'Talent Land Hackathon' }
    ],
    color: 'from-red-500 to-orange-600'
  },
  {
    title: 'First Place at the Vara Network Hackathon at ITAM, Mexico City',
    category: 'Hackathon',
    description: 'I won 1st place at the MegaHackathon by Vara Network at ITAM with Monogatari, a Web3 platform revolutionizing manga through blockchain, smart contracts, and NFTs. As a Frontend Developer.',
    highlights: [
      'Application login using a web3-to-web2 abstraction for user convenience',
      'Hackaton Team',
      'NFT collection for application users'
    ],
    icon: <FiStar className="h-16 w-16 text-white" />,
    images: [
      { src: '/img/vara/vara1.jpeg', alt: 'Vara Network Hackathon at ITAM' },
      { src: '/img/vara/vara2.jpeg', alt: 'Vara Network Hackathon Award' }
    ],
    color: 'from-blue-500 to-purple-600'
  },
  {
    title: 'Third Place at the Vara Network Hackathon in Chiapas',
    category: 'Hackathon',
    description: 'I achieved 3rd place at the Hackathon in Chiapas, sponsored by Vara Network, with a blockchain-based project. In the team, I served as the Frontend Developer.',
    highlights: [
      'Blockchain-based solution',
      'Frontend Development using modern web technologies',
      'Team collaboration in a competitive environment'
    ],
    icon: <FiAward className="h-16 w-16 text-white" />,
    images: [], // Add image paths when available
    color: 'from-green-500 to-teal-600'
  }
];

export default achievements;