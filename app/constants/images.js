export const IMAGES = {
  PROFILE: 'https://randomuser.me/api/portraits/men/36.jpg',
  BANNER: 'https://images.unsplash.com/photo-1511497584788-876760111969',
  CAUSE_1: 'https://images.unsplash.com/photo-1511497584788-876760111969',
  CAUSE_2: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  CAUSE_3: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d',
  CAUSE_4: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
  CAUSE_5: 'https://images.unsplash.com/photo-1534567110353-1f46a365bb9a',
  ORG_1: require('../assets/Hasar.png'),
  ORG_2: require('../assets/Rwanga.png'),
};

export const CAUSES = [
  {
    id: '1',
    title: 'Protect Kurdistan\'s Mountain Forests',
    amount: 8750,
    target: 20000,
    image: IMAGES.CAUSE_1,
  },
  {
    id: '2',
    title: 'Clean Water for Rural Communities',
    amount: 8250,
    target: 20000,
    image: IMAGES.CAUSE_2,
  },
  {
    id: '3',
    title: 'Solar Energy for Schools',
    amount: 10250,
    target: 25000,
    image: IMAGES.CAUSE_3,
  },
];

export const ORGANIZATIONS = [
  {
    id: '1',
    name: 'Hasar Organization',
    logo: IMAGES.ORG_1,
  },
  {
    id: '2',
    name: 'Rwanga Foundation',
    logo: IMAGES.ORG_2,
  },
]; 