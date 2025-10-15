import app from 'flarum/forum/app';
import { override } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import MagicSlider from './components/MagicSlider';
import TagsPage from 'flarum/tags/components/TagsPage';

type Slide = { image: string; link?: string; newTab?: boolean | string };

function readSlides(): Slide[] {
  const raw = app.forum.attribute<string>('capybash-magicslider.slides') || '[]';
  let slides: Slide[] = [];
  try {
    slides = JSON.parse(raw) as Slide[];
  } catch {
    slides = [];
  }

  return slides
    .filter((s) => s && s.image)
    .map((s) => ({
      image: s.image || '',
      link: s.link || '',
      newTab: s.newTab === true || s.newTab === 'true',
    }));
}

function readDims() {
  const heightDesktop = Number(app.forum.attribute('capybash-magicslider.height_desktop') || 260);
  const heightMobile = Number(app.forum.attribute('capybash-magicslider.height_mobile') || 200);
  const padding = Number(app.forum.attribute('capybash-magicslider.padding') || 0);
  const radius = Number(app.forum.attribute('capybash-magicslider.radius') || 0);
  const autoplaySec = Number(app.forum.attribute('capybash-magicslider.autoplay') || 0);
  const autoplayMs = autoplaySec > 0 ? autoplaySec * 1000 : 0;

  return { heightDesktop, heightMobile, padding, radius, autoplayMs };
}

app.initializers.add('capybash-magicslider', () => {
  override(IndexPage.prototype, 'hero', function (original: any) {
    const slides = readSlides();
    if (!slides.length) return original();

    const routeName =
      (app.current as any)?.data?.routeName ||
      (app.current as any)?.get?.('routeName') ||
      '';

    if (routeName.startsWith('tag')) {
      return original();
    }

    const { heightDesktop, heightMobile, padding, radius, autoplayMs } = readDims();

    return (
      <MagicSlider
        slides={slides}
        heightDesktop={heightDesktop}
        heightMobile={heightMobile}
        padding={padding}
        radius={radius}
        autoplayMs={autoplayMs}
      />
    );
  });

  try {
    if (TagsPage) {
      override(TagsPage.prototype, 'hero', function (_original: any) {
        const slides = readSlides();
        if (!slides.length) return null;

        const { heightDesktop, heightMobile, padding, radius, autoplayMs } = readDims();

        return (
          <MagicSlider
            slides={slides}
            heightDesktop={heightDesktop}
            heightMobile={heightMobile}
            padding={padding}
            radius={radius}
            autoplayMs={autoplayMs}
          />
        );
      });
    }
  } catch {}
});