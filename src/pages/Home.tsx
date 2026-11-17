import { useEffect, useState } from 'react';
import BirthdayHero from '../components/BirthdayHero';
import BirthdayLetter from '../components/BirthdayLetter';
import CurtainIntro from '../components/CurtainIntro';
import FinalCelebration from '../components/FinalCelebration';
import FloatingDecorations from '../components/FloatingDecorations';
import GiftReveal from '../components/GiftReveal';
import InteractiveCake from '../components/InteractiveCake';
import MemoryGallery from '../components/MemoryGallery';
import MusicPlayer from '../components/MusicPlayer';
import { useMusic } from '../hooks/useMusic';
import { boom, sparkle } from '../lib/fx';

export default function Home() {
  const [open, setOpen] = useState(false);
  const music = useMusic();

  useEffect(() => {
    document.body.style.overflow = open ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {!open && <CurtainIntro onTouch={music.start} onOpen={() => { setOpen(true); boom(); sparkle(); }} />}
      <FloatingDecorations />
      <main>
        <BirthdayHero />
        <InteractiveCake />
        <BirthdayLetter />
        <MemoryGallery />
        <GiftReveal />
        <FinalCelebration />
      </main>
      <MusicPlayer {...music} />
    </>
  );
}
