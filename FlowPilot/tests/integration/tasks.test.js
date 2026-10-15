import test from 'node:test';import assert from 'node:assert/strict';import {STATUSES} from '../../js/core/constants.js';
test('kanban workflow has the four expected task statuses',()=>assert.deepEqual(STATUSES,['To Do','In Progress','Review','Completed']));
