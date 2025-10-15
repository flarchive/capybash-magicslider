import app from 'flarum/forum/app';
import { override } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import MagicSlider from './components/MagicSlider';

type Slide = { image: string; link?: string; newTab?: boolean | string };

app.initializers.add('capybash-magicslider', () => {
  override(IndexPage.prototype, 'hero', function (original) {
    const rawSlides = app.forum.attribute<string>('capybash-magicslider.slides') || '[]';

    let slides: Slide[] = [];
    try {
      slides = JSON.parse(rawSlides) as Slide[];
    } catch {
      slides = [];
    }

    const normSlides = slides
      .filter((s) => s && s.image)
      .map((s) => ({
        image: s.image || '',
        link: s.link || '',
        newTab: (s.newTab === true || s.newTab === 'true') ? true : false,
      }));

    const heightDesktop = Number(app.forum.attribute('capybash-magicslider.height_desktop') || 260);
    const heightMobile = Number(app.forum.attribute('capybash-magicslider.height_mobile') || 200);
    const padding = Number(app.forum.attribute('capybash-magicslider.padding') || 0);
    const radius = Number(app.forum.attribute('capybash-magicslider.radius') || 0);
    const autoplay = Number(app.forum.attribute('capybash-magicslider.autoplay') || 0);

    if (!normSlides.length) return original();

    return (
      <MagicSlider
        slides={normSlides}
        heightDesktop={heightDesktop}
        heightMobile={heightMobile}
        padding={padding}
        radius={radius}
        autoplayMs={autoplay}
      />
    );
  });
});