const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../Recipe Helper.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'Unique element IDs');
for (const match of script.matchAll(/\$\('([^']+)'\)/g)) assert(ids.includes(match[1]), `Missing control ${match[1]}`);
assert(!/fetch\(|https?:\/\//.test(script), 'No network or AI requests');
const parserCode = script.slice(script.indexOf('function parseRecipeText('), script.indexOf('function showNotes('));
const amountCode = script.slice(script.indexOf('function amount('), script.indexOf('function valid('));
const context = vm.createContext({});
vm.runInContext("const normalize = value => value.trim().toLowerCase();\n" + amountCode + '\n' + parserCode, context);
const parse = text => JSON.parse(JSON.stringify(context.parseRecipeText(text)));
let checks = 0;
function check(name, callback) { callback(); checks++; console.log('PASS: ' + name); }
check('Organized musubi: title, yield, ingredients, steps', () => {
  const r = parse('Spam musubi\nMakes: 8 pieces\nIngredients:\n2 cups cooked rice\n1 can Spam\n2 sheets nori\nInstructions:\n1. Fry Spam.\n2. Shape and wrap.');
  assert.equal(r.title, 'Spam musubi'); assert.equal(r.yield, 8); assert.equal(r.unit, 'pieces');
  assert.deepEqual(r.ingredients, [{name:'cooked rice',quantity:2,unit:'cups'}, {name:'Spam',quantity:1,unit:'can'}, {name:'nori',quantity:2,unit:'sheets'}]);
  assert.equal(r.instructions, 'Fry Spam.\nShape and wrap.'); assert.deepEqual(r.notes, []);
});
check('Missing amounts remain blank and visible', () => {
  const r = parse('Rice bowl\nIngredients\n2 cups rice\na little sauce\nsalt to taste\nInstructions\nStir together.');
  assert.equal(r.yield, ''); assert.equal(r.unit, '');
  assert.deepEqual(r.ingredients[1], {name:'a little sauce',quantity:'',unit:''});
  assert.deepEqual(r.ingredients[2], {name:'salt to taste',quantity:'',unit:''});
  assert(r.notes.some(n => n.includes('a little sauce'))); assert(r.notes.some(n => n.includes('salt to taste')));
});
check('Fractions, unicode fractions, compact metric units, and decimals', () => {
  const r = parse('Title: Test\nServes: 2\nIngredients\n1 1/2 cups rice\n½ tsp salt\n200g tofu\n.5 tbsp oil\n1½ cups water\nDirections\n1. Stir.');
  assert.deepEqual(r.ingredients.map(i => i.quantity), [1.5,.5,200,.5,1.5]);
  assert.equal(r.ingredients[2].name, 'tofu'); assert.equal(r.ingredients[2].unit, 'g');
});
check('Ranges, alternatives, zero, and invalid fractions are not guessed', () => {
  const r = parse('Ingredients\n1-2 cups rice\n2 to 3 tbsp oil\n1 or 2 eggs\n0 cups salt\n1/0 cup water');
  assert(r.ingredients.every(i => i.quantity === '')); assert.equal(r.notes.filter(n => n.startsWith('Amount needs review:')).length, 5);
});
check('Yield alternatives and compound amounts require review', () => {
  for (const line of ['Serves: 2 to 3', 'Serves: 2 or 3', 'Makes: 2 - 3 pieces', 'Yield: 2 / 3 bowls']) {
    const r = parse('Rice\n' + line + '\nIngredients\n1 cup rice\nInstructions\nCook.');
    assert.equal(r.yield, '', line); assert.equal(r.unit, '', line);
    assert(r.notes.some(n => n.includes('Yield needs review: ' + line)));
  }
  for (const line of ['1 cup plus 2 tbsp flour', '1 cup and 2 tbsp flour']) {
    const r = parse('Ingredients\n' + line);
    assert.equal(r.ingredients[0].quantity, '', line);
    assert(r.notes.some(n => n.includes('Amount needs review: ' + line)));
  }
});
check('Unmatched content and subheadings stay in review notes', () => {
  const r = parse('Bowl\nCook time: 10 minutes\nIngredients\nFor the sauce:\n2 tbsp oil\n1. Mix it well.\nDirections\nServe.');
  for (const text of ['Cook time: 10 minutes','For the sauce:','1. Mix it well.']) assert(r.notes.some(n => n.includes(text)));
});
check('No-heading input: measured ingredients and numbered steps only', () => {
  const r = parse('My dinner\n2 cups rice\na little sauce\n1. Cook rice.');
  assert.equal(r.title, ''); assert.equal(r.ingredients.length, 1); assert.equal(r.instructions, 'Cook rice.');
  assert(r.notes.some(n => n.includes('My dinner'))); assert(r.notes.some(n => n.includes('a little sauce')));
});
check('Chinese or arbitrary captions are retained for manual review', () => {
  const r = parse('午餐肉饭团\n米饭适量\n先煎午餐肉，再包上海苔。');
  assert.equal(r.ingredients.length, 0); assert.equal(r.notes.filter(n => n.startsWith('Unmatched text')).length, 3);
});
check('Repeated ingredient names are flagged', () => {
  const r = parse('Ingredients\n1 cup rice\n2 cups rice');
  assert(r.notes.some(n => n.includes('Repeated ingredient names')));
});
check('Count ingredients retain the noun and prompt unit review', () => {
  const r = parse('Ingredients\n2 large eggs');
  assert.deepEqual(r.ingredients[0], {name:'large eggs',quantity:2,unit:''});
  assert(r.notes.some(n => n.includes('2 large eggs')));
});
check('Markup stays literal source data', () => {
  const r = parse('Ingredients\n1 cup <img src=x onerror=alert(1)>');
  assert.equal(r.ingredients[0].name, '<img src=x onerror=alert(1)>');
  assert(script.includes("$('original-text').textContent = pastedSource"));
});
console.log(`PASS: ${checks} realistic parser cases, valid JavaScript, ${ids.length} unique controls, no network requests.`);
