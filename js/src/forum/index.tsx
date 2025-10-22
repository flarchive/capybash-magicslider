import app from 'flarum/forum/app';
import { override } from 'flarum/common/extend';

import IndexPage from 'flarum/forum/components/IndexPage';
import WelcomeHero from 'flarum/forum/components/WelcomeHero';

import MagicSlider from './components/MagicSlider';

type Slide = { image: string; link?: string; newTab?: boolean | string };

function isTrue(v: unknown): boolean {
  return v === true || v === 1 || v === '1' || v === 'true';
}

function buildSlider() {
  const raw = app.forum.attribute<string>('capybash-magicslider.slides') || '[]';

  let slides: Slide[] = [];
  try {
    slides = JSON.parse(raw) as Slide[];
  } catch {
    slides = [];
  }

  const norm = slides
    .filter((s) => s && s.image)
    .map((s) => ({ image: s.image || '', link: s.link || '', newTab: s.newTab === true || s.newTab === 'true' }));

  if (!norm.length) return null;

  const heightDesktop  = Number(app.forum.attribute('capybash-magicslider.height_desktop') || 260);
  const heightMobile   = Number(app.forum.attribute('capybash-magicslider.height_mobile') || 200);
  const paddingDesktop = Number(app.forum.attribute('capybash-magicslider.padding_desktop') || 0);
  const paddingMobile  = Number(app.forum.attribute('capybash-magicslider.padding_mobile') || 0);
  const radiusDesktop  = Number(app.forum.attribute('capybash-magicslider.radius_desktop') || 0);
  const radiusMobile   = Number(app.forum.attribute('capybash-magicslider.radius_mobile') || 0);
  const autoplay       = Number(app.forum.attribute('capybash-magicslider.autoplay') || 0);
  const fitToLayout    = isTrue(app.forum.attribute('capybash-magicslider.fit_to_layout'));

  return (
    <MagicSlider
      slides={norm}
      heightDesktop={heightDesktop}
      heightMobile={heightMobile}
      paddingDesktop={paddingDesktop}
      paddingMobile={paddingMobile}
      radiusDesktop={radiusDesktop}
      radiusMobile={radiusMobile}
      autoplayMs={autoplay}
      fitToLayout={fitToLayout}
    />
  );
}

function replaceHero(original: () => Mithril.Children) {
  const slider = buildSlider();
  return slider ?? original();
}

app.initializers.add('capybash-magicslider', () => {
  override(IndexPage.prototype, 'hero', function (original) {
    return replaceHero(original);
  });

  override(WelcomeHero.prototype, 'view', function (original) {
    const slider = buildSlider();
    return slider ?? original();
  });
});