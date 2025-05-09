export const IMAGES = {
  PROFILE: 'https://randomuser.me/api/portraits/men/36.jpg',
  BANNER: 'https://images.unsplash.com/photo-1569680087741-9270618c54e0',
  CAUSE_1: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6',
  CAUSE_2: 'https://images.unsplash.com/photo-1573511860302-28c524319d2a',
  CAUSE_3: 'https://images.unsplash.com/photo-1591057650353-522494ae901d',
  ORG_1: 'https://static.vecteezy.com/system/resources/thumbnails/002/229/125/small/water-wave-logo-illustration-free-vector.jpg',
  ORG_2: 'https://img.freepik.com/free-vector/gradient-tree-logo-template_23-2148212117.jpg',
};

export const CAUSES = [
  {
    id: '1',
    title: 'Capacity Building Workshop on Sub-national',
    amount: 8750,
    target: 20000,
    image: IMAGES.CAUSE_1,
  },
  {
    id: '2',
    title: 'Air Pollution',
    amount: 8250,
    target: 20000,
    image: IMAGES.CAUSE_2,
  },
  {
    id: '3',
    title: 'Waste Management',
    amount: 10250,
    target: 25000,
    image: IMAGES.CAUSE_3,
  },
];

export const ORGANIZATIONS = [
  {
    id: '1',
    name: 'Water Conservation',
    logo: IMAGES.ORG_1,
  },
  {
    id: '2',
    name: 'Tree Planting',
    logo: IMAGES.ORG_2,
  },
]; 