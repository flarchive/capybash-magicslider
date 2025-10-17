import Component, { ComponentAttrs } from 'flarum/common/Component';

type Slide = { image: string; link?: string; newTab?: boolean };

interface MagicSliderAttrs extends ComponentAttrs {
  slides: Slide[];
  heightDesktop: number;
  heightMobile: number;
  padding: number;
  radius: number;
  autoplayMs: number;
}

export default class MagicSlider extends Component<MagicSliderAttrs> {
  private index = 0;
  private interval?: number;
  private touchStartX: number | null = null;

  oncreate(vnode: any) {
    const ms = Number(vnode.attrs.autoplayMs || 0);
    if (vnode.attrs.slides.length > 1 && ms > 0) {
      this.interval = window.setInterval(() => {
        this.next(vnode.attrs.slides.length);
        m.redraw();
      }, ms);
    }
  }

  onremove() {
    if (this.interval) window.clearInterval(this.interval);
  }

  private next(len: number) {
    this.index = (this.index + 1) % len;
  }

  private prev(len: number) {
    this.index = (this.index - 1 + len) % len;
  }

  private onPointerDown(e: PointerEvent) {
    this.touchStartX = e.clientX ?? 0;
  }

  private onPointerUp(e: PointerEvent, len: number) {
    if (this.touchStartX === null) return;
    const dx = (e.clientX ?? 0) - this.touchStartX;
    this.touchStartX = null;

    const threshold = 40;
    if (Math.abs(dx) > threshold) {
      if (dx < 0) this.next(len);
      else this.prev(len);
      m.redraw();
    }
  }

  view(vnode: any) {
    const { slides, heightDesktop, heightMobile, padding, radius } = vnode.attrs;
    if (!slides.length) return null;

    const offsetPct = -(this.index * 100);

    return (
      <div className="MagicSlider-wrap" style={{ padding: `${padding}px` }}>
        <div
          className="MagicSlider"
          style={{
            borderRadius: `${radius}px`,
            ['--ms-h-desktop' as any]: `${heightDesktop}px`,
            ['--ms-h-mobile' as any]: `${heightMobile}px`,
          }}
          onpointerdown={(e: any) => this.onPointerDown(e)}
          onpointerup={(e: any) => this.onPointerUp(e, slides.length)}
        >
          <div className="MagicSlider-track" style={{ transform: `translateX(${offsetPct}%)` }}>
            {slides.map((s: Slide, i: number) => (
              <a
                key={i}
                className="MagicSlide"
                href={s.link || '#'}
                target={s.link ? (s.newTab ? '_blank' : '_self') : undefined}
                rel={s.link && s.newTab ? 'noopener' : undefined}
                style={{ backgroundImage: `url('${s.image}')` }}
                onclick={(e: MouseEvent) => {
                  if (!s.link) e.preventDefault();
                }}
              />
            ))}
          </div>

          {slides.length > 1 && (
            <>
              <button
                className="MagicSlider-btn prev"
                aria-label="Previous"
                onclick={() => {
                  this.prev(slides.length);
                }}
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              <button
                className="MagicSlider-btn next"
                aria-label="Next"
                onclick={() => {
                  this.next(slides.length);
                }}
              >
                <i className="fas fa-chevron-right"></i>
              </button>

              <div className="MagicSlider-dots">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    className={'dot' + (this.index === i ? ' is-active' : '')}
                    aria-label={`Slide ${i + 1}`}
                    onclick={() => {
                      this.index = i;
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}