import test from 'node:test';import assert from 'node:assert/strict';import {balance} from '../../js/utils/calculations.js';
test('finance balance uses transaction types and amounts',()=>assert.equal(balance([{type:'Income',amount:500},{type:'Expense',amount:120},{type:'Income',amount:20}]),400));
