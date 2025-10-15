import app from 'flarum/admin/app';
import MagicSliderSettingsPage from './components/MagicSliderSettingsPage';

app.initializers.add('capybash-magicslider', () => {
  app.extensionData.for('capybash-magicslider').registerPage(MagicSliderSettingsPage);
});