import {countEl} from '../utility/utility'

test('count el X into array [X,,] = 1', () => {
    expect(countEl(['X',"",""],"X")).toBe(1);
  });