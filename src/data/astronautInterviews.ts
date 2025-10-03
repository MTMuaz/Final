export interface AstronautInterview {
  id: string;
  url: string;
  videoId: string;
  title: string;
  caption: string;
  description: string;
  thumbnail: string;
  duration: string;
}

export const astronautInterviews: AstronautInterview[] = [
  {
    id: '1',
    url: 'https://www.youtube.com/watch?v=PVxaL8CAO4M',
    videoId: 'PVxaL8CAO4M',
    title: 'Life on the International Space Station',
    caption: 'Astronaut Chris Hadfield shares his experiences living and working aboard the ISS',
    description: 'Join Commander Chris Hadfield as he takes you through a fascinating tour of daily life on the International Space Station. Learn about the challenges of eating, sleeping, and conducting research in microgravity while orbiting Earth at 28,000 km/h.',
    thumbnail: 'https://img.youtube.com/vi/PVxaL8CAO4M/maxresdefault.jpg',
    duration: '45 min'
  },
  {
    id: '2',
    url: 'https://www.youtube.com/watch?v=t93UCj1hzu8',
    videoId: 't93UCj1hzu8',
    title: 'Spacewalk Preparation and Training',
    caption: 'Behind-the-scenes look at astronaut training for extravehicular activities',
    description: 'Discover the intensive preparation astronauts undergo before conducting spacewalks. This comprehensive documentary shows training in the Neutral Buoyancy Laboratory, spacesuit technology, and the challenges of working in the vacuum of space.',
    thumbnail: 'https://img.youtube.com/vi/t93UCj1hzu8/maxresdefault.jpg',
    duration: '52 min'
  },
  {
    id: '3',
    url: 'https://www.youtube.com/watch?v=5AC5h4zKU4o',
    videoId: '5AC5h4zKU4o',
    title: 'Scientific Research in Microgravity',
    caption: 'Exploring groundbreaking experiments conducted on the ISS',
    description: 'Learn about the cutting-edge scientific research being conducted aboard the International Space Station. From protein crystal growth for drug development to understanding combustion in space, discover how microgravity enables experiments impossible on Earth.',
    thumbnail: 'https://img.youtube.com/vi/5AC5h4zKU4o/maxresdefault.jpg',
    duration: '38 min'
  },
  {
    id: '4',
    url: 'https://www.youtube.com/watch?v=dikG4vMJG1s',
    videoId: 'dikG4vMJG1s',
    title: 'International Cooperation in Space',
    caption: 'How 15 nations work together on humanity\'s orbital outpost',
    description: 'Explore the remarkable international partnership that makes the ISS possible. Hear from astronauts and cosmonauts about working with colleagues from around the world and how space exploration unites humanity despite earthly differences.',
    thumbnail: 'https://img.youtube.com/vi/dikG4vMJG1s/maxresdefault.jpg',
    duration: '41 min'
  },
  {
    id: '5',
    url: 'https://www.youtube.com/watch?v=t6rHHnABoT8',
    videoId: 't6rHHnABoT8',
    title: 'From Earth to Orbit: Launch Experience',
    caption: 'Astronauts describe the incredible journey to the ISS',
    description: 'Experience the intense and exhilarating journey from Earth to the International Space Station. Astronauts share their personal accounts of launch day, the Soyuz and Dragon spacecraft, and the magical moment of arriving at humanity\'s home in space.',
    thumbnail: 'https://img.youtube.com/vi/t6rHHnABoT8/maxresdefault.jpg',
    duration: '35 min'
  },
  {
    id: '6',
    url: 'https://www.youtube.com/watch?v=yMU7XcCNXu8',
    videoId: 'yMU7XcCNXu8',
    title: 'Health and Fitness in Space',
    caption: 'Maintaining physical and mental health during long-duration missions',
    description: 'Understand the critical importance of exercise and healthcare in space. Learn about the specialized equipment astronauts use, the medical challenges of living in microgravity, and how NASA prepares crews for the psychological aspects of isolation.',
    thumbnail: 'https://img.youtube.com/vi/yMU7XcCNXu8/maxresdefault.jpg',
    duration: '43 min'
  },
  {
    id: '7',
    url: 'https://www.youtube.com/watch?v=LJ00lqOV5yY',
    videoId: 'LJ00lqOV5yY',
    title: 'The Future of Space Exploration',
    caption: 'ISS as a stepping stone to the Moon and Mars',
    description: 'Discover how the International Space Station serves as a crucial testbed for future deep space missions. Astronauts and engineers discuss the technologies being developed for lunar bases and Mars expeditions, inspired by lessons learned on the ISS.',
    thumbnail: 'https://img.youtube.com/vi/LJ00lqOV5yY/maxresdefault.jpg',
    duration: '48 min'
  },
  {
    id: '8',
    url: 'https://www.youtube.com/watch?v=Wpzvaqypav8',
    videoId: 'Wpzvaqypav8',
    title: 'Robotics and Technology on the ISS',
    caption: 'The robotic systems that keep the station operational',
    description: 'Explore the sophisticated robotic arms and automated systems aboard the ISS. Learn about Canadarm2, Dextre, and other robotic marvels that assist with station maintenance, cargo handling, and scientific experiments in the harsh space environment.',
    thumbnail: 'https://img.youtube.com/vi/Wpzvaqypav8/maxresdefault.jpg',
    duration: '39 min'
  },
  {
    id: '9',
    url: 'https://www.youtube.com/watch?v=3bCoGC532p8',
    videoId: '3bCoGC532p8',
    title: 'Returning Home: Re-entry and Landing',
    caption: 'The thrilling and dangerous journey back to Earth',
    description: 'Experience the dramatic return from space as astronauts describe the intense re-entry process. From undocking from the ISS to the fiery descent through Earth\'s atmosphere and final parachute landing, discover what it takes to safely return home after months in orbit.',
    thumbnail: 'https://img.youtube.com/vi/3bCoGC532p8/maxresdefault.jpg',
    duration: '36 min'
  }
];
