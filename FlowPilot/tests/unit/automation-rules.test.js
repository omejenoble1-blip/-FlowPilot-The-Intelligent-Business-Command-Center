import test from 'node:test';import assert from 'node:assert/strict';import {daysUntil,isOverdue} from '../../js/utils/dates.js';
test('overdue helper detects past dates and ignores empty dates',()=>{assert.equal(isOverdue('2000-01-01'),true);assert.equal(isOverdue(''),false);});
test('daysUntil returns null for missing date',()=>assert.equal(daysUntil(''),null));
