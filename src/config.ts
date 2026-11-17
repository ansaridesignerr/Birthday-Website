// ===== EDIT ME: all personal content lives here =====
export type Photo = { src: string; alt: string; caption: string };

export const CONFIG = {
  name: 'Beautiful',
  heroTitle: 'Happy Birthday,',
  heroSub: 'Today is all about you. A little celebration, a lot of love, and countless beautiful wishes.',
  candles: 5,
  music: '/audio/birthday-music.mp3', // replace the file; a soft built-in melody plays if it is missing
  letter:
    'Happy Birthday to someone who makes the world a little more beautiful just by being in it.\n\nI hope your special day brings you endless happiness, beautiful memories, genuine smiles, and everything your heart wishes for.\n\nKeep smiling, keep shining, and never stop being the wonderful person you are.\n\nYou deserve all the happiness in the world. Happy Birthday!',
  gift: 'Surprise! You are one of the sweetest parts of this world. Never forget how special you are.',
  finalTitle: 'May Your Every Wish Come True!',
  finalSub: 'Here’s to another year of beautiful moments, endless smiles, unexpected happiness, and dreams coming true.',
  finalNote: 'Stay Happy. Stay Blessed. Keep Shining!',
  photos: [
    { src: '/images/memory-01.jpg', alt: 'A favourite day together', caption: 'Our happy place' },
    { src: '/images/memory-02.jpg', alt: 'Smiling together', caption: 'Giggles for days' },
    { src: '/images/memory-03.jpg', alt: 'A sunny adventure', caption: 'Sunshine & you' },
    { src: '/images/memory-04.jpg', alt: 'A sweet moment', caption: 'Sweetest memories' },
    { src: '/images/memory-05.jpg', alt: 'A cozy evening', caption: 'Cozy nights' },
    { src: '/images/memory-06.jpg', alt: 'Celebrating', caption: 'Celebrate good times' },
    { src: '/images/memory-07.jpg', alt: 'A silly moment', caption: 'Pure silliness' },
    { src: '/images/memory-08.jpg', alt: 'Together', caption: 'Always you' },
  ] as Photo[],
};
