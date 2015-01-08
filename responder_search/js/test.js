/**
 * Copyright 2014 Intermedix Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied.  See the License for the specific language
 * governing permissions and limitations under the License.
 */

QUnit.test('App JavaScript loaded.', function (assert) {
    assert.ok(typeof App.displayResults === 'function', 'Passed!');
});
QUnit.test('Filter: string "Baker" in "Christopher Baker" should contain (true)', function (assert) {
    assert.ok(App._contains('Baker', 'Christopher Baker') === true, 'Return was true');
});
QUnit.test('Filter: string "Allan" in "Wendy Campbell" should not contain (false)', function (assert) {
    assert.ok(App._contains('Allan', 'Wendy Campbell') === false, 'Return was false!');
});
