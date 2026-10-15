import test from 'node:test';import assert from 'node:assert/strict';import {validateRecord,safeNumber,normalizeText} from '../../js/utils/validators.js';
const fields=[['name','Name','text',true],['amount','Amount','number',true],['email','Email','email',false]];
test('required fields are validated',()=>assert.equal(validateRecord({name:'',amount:2},fields).name,'Name is required.'));
test('negative and invalid numbers are rejected',()=>{assert.ok(validateRecord({name:'A',amount:-2},fields).amount);assert.ok(validateRecord({name:'A',amount:'abc'},fields).amount);});
test('email format is checked when supplied',()=>assert.equal(validateRecord({name:'A',amount:1,email:'bad'},fields).email,'Enter a valid email address.'));
test('safeNumber and normalizeText have stable fallbacks',()=>{assert.equal(safeNumber('x',7),7);assert.equal(normalizeText(' hi '),'hi');});
