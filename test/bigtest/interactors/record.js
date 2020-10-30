import {
  interactor,
  clickable,
  isPresent,
  isVisible
} from '@bigtest/interactor';
import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';

const SegmentButtonBibInteractor = interactor(class SegmentButtonBibInteractor {
  clickThrough = clickable();
  isButtonVisible = isVisible();
});

const SegmentButtonAuthInteractor = interactor(class SegmentButtonAuthInteractor {
  clickThrough = clickable();
});

const DismissButtonInteractor = interactor(class DismissButtonInteractor {
  clickThrough = clickable();
  isButtonPresent = isPresent();
});

@interactor class HeaderDropdown {
  click = clickable('button');
}

@interactor class HeaderDropdownMenu {
  isNewButtonPresent = isPresent('#clickable-dropdown-new-record')
  clickNew = clickable('#clickable-dropdown-new-record');
}

export default interactor(class RecordInteractor {
  static defaultScope = '#ModuleContainer';
  segmentButtonBib = new SegmentButtonBibInteractor('[data-test-btn-segment-bib]');
  segmentButtonAuth = new SegmentButtonAuthInteractor('[data-test-btn-segment-auth]');
  headerDropdown = new HeaderDropdown('#paneHeaderdata-test-search-result-pane [data-pane-header-actions-dropdown]');
  headerDropdownMenu = new HeaderDropdownMenu();
  dismissButton = new DismissButtonInteractor('[data-test-pane-header-dismiss-button]');
  leaderButton = new ButtonInteractor('#fieldleaderbtndown');
  leaderButtonPresent = isPresent('#fieldleaderbtndown');
  tag006Button = new ButtonInteractor('#field006btndown');
  tag006ButtonPresent = isPresent('#field006btndown');
  tag007Button = new ButtonInteractor('#field007btndown');
  tag007ButtonPresent = isPresent('#field007btndown');
  tag008Button = new ButtonInteractor('#field008btndown');
  tag008ButtonPresent = isPresent('#field008btndown');
});
