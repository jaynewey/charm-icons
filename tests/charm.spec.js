import * as icons from './icons';
import {
  getAttrs, toSvg, toElement, placeIcons,
} from '../src/charm';

describe('gets attribute of an icon correctly', () => {
  test('works with no optional attrs', () => {
    expect(getAttrs(icons.Tick)).toStrictEqual({
      xmlns: 'http://www.w3.org/2000/svg',
      version: '1.1',
      viewBox: '0 0 16 16',
      width: '16',
      height: '16',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '1.5',
      class: 'charm charm-tick',
    });
  });

  test('works with optional attrs', () => {
    expect(getAttrs(icons.Tick, { test: 'val', 'stroke-width': '2', class: 'test' })).toStrictEqual({
      xmlns: 'http://www.w3.org/2000/svg',
      version: '1.1',
      viewBox: '0 0 16 16',
      width: '16',
      height: '16',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '2',
      class: 'charm charm-tick test',
      test: 'val',
    });
  });
});

describe('converts icon to svg string', () => {
  test('works with no optional attrs', () => {
    expect(toSvg(icons.Tick))
      .toBe('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" class="charm charm-tick"><polyline points="2.75 8.75,6.25 12.25,13.25 4.75"/></svg>');
  });

  test('works with optional attrs', () => {
    expect(toSvg(icons.Tick, { test: 'val', 'stroke-width': '2', class: 'test' }))
      .toBe('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" test="val" class="charm charm-tick test"><polyline points="2.75 8.75,6.25 12.25,13.25 4.75"/></svg>');
  });
});

test('converts icon to HTMLElement', () => {
  const element = toElement(icons.Tick);
  // Check it's an SVG
  expect(element.tagName).toBe('svg');
});

describe('places icons in the DOM', () => {
  test('throws error when passing no icons', () => {
    expect(() => placeIcons()).toThrow('No icons provided to replace. Please provide your icon objects.');
  });

  test('reads elements from the DOM and replaces them', () => {
    document.body.innerHTML = '<i data-charm="tick"></i>';
    placeIcons({ icons });
    expect(document.body.innerHTML).toBe('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" class="charm charm-tick"><polyline points="2.75 8.75,6.25 12.25,13.25 4.75"></polyline></svg>');
  });

  test('works with different `replaceAttr`', () => {
    document.body.innerHTML = '<i test-attr="tick"></i>';
    placeIcons({ icons, replaceAttr: 'test-attr' });
    expect(document.body.innerHTML).toBe('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" class="charm charm-tick"><polyline points="2.75 8.75,6.25 12.25,13.25 4.75"></polyline></svg>');
  });

  test('applies attributes of original element', () => {
    document.body.innerHTML = '<i data-charm="tick" class="test" test="val"></i>';
    placeIcons({ icons });
    expect(document.body.innerHTML).toBe('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" class="charm charm-tick test" test="val"><polyline points="2.75 8.75,6.25 12.25,13.25 4.75"></polyline></svg>');
  });
});
