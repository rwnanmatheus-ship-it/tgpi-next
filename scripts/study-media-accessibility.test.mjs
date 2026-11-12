import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { asynchronousHandover as asset } from '../src/lib/learning/accessible-media.ts';

function cueSeconds(stamp) {
  const [hours, minutes, seconds] = stamp.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

test('the study video has paired caption files and matching descriptive transcript timestamps', () => {
  assert.ok(readFileSync('public' + asset.source).includes(Buffer.from('ftyp')));
  assert.ok(readFileSync('public' + asset.poster).includes(Buffer.from('WEBP')));
  assert.equal(asset.audioDescription, 'integrated');
  for (const [language, path] of Object.entries(asset.captions)) {
    const captions = readFileSync('public' + path, 'utf8');
    assert.ok(captions.startsWith('WEBVTT\n\n'));
    const cues = Array.from(captions.matchAll(/^(\d\d:\d\d:\d\d\.\d{3}) --> (\d\d:\d\d:\d\d\.\d{3})\n([^\n].*)$/gm));
    assert.deepEqual(cues.map(cue => cueSeconds(cue[1])), asset.transcript.map(cue => cue.seconds));
    for (const [index, cue] of cues.entries()) {
      assert.ok(asset.transcript[index][language].length > 25);
      assert.ok(cueSeconds(cue[2]) > cueSeconds(cue[1]));
      assert.ok(!index || cueSeconds(cue[1]) >= cueSeconds(cues[index - 1][2]));
    }
  }
});
