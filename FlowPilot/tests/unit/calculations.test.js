import test from 'node:test';import assert from 'node:assert/strict';
import {sum,percent,balance,riskScore,projectProgress} from '../../js/utils/calculations.js';
test('sum ignores non-finite values',()=>assert.equal(sum([{v:2},{v:'3'},{v:'x'}],x=>x.v),5));
test('percent clamps and handles invalid targets',()=>{assert.equal(percent(5,10),50);assert.equal(percent(20,10),100);assert.equal(percent(1,0),0);});
test('balance uses recorded income minus expenses',()=>assert.equal(balance([{type:'Income',amount:100},{type:'Expense',amount:25},{type:'Expense',amount:5}]),70));
test('risk score multiplies bounded probability and impact',()=>{assert.equal(riskScore(4,3),12);assert.equal(riskScore(99,2),10);});
test('project progress derives from linked tasks when no manual progress exists',()=>{assert.equal(projectProgress({id:'p'},[{projectId:'p',status:'Completed'},{projectId:'p',status:'To Do'}]),50);});
