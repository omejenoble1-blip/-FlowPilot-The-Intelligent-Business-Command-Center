import test from 'node:test';import assert from 'node:assert/strict';import {escapeHTML,initials,slug} from '../../js/utils/formatters.js';
test('escapeHTML escapes markup characters',()=>assert.equal(escapeHTML('<b>"x"</b>'), '&lt;b&gt;&quot;x&quot;&lt;/b&gt;'));
test('initials supports multiple names and empty values',()=>{assert.equal(initials('Ada Lovelace'),'AL');assert.equal(initials(''),'U');});
test('slug creates stable simple identifiers',()=>assert.equal(slug('FlowPilot Business OS'),'flowpilot-business-os'));
