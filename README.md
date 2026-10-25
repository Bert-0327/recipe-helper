# Recipe Helper

Save your recipes, change how much you want to make, and compare different versions of a recipe.

## Choose a page

- **[Open the full Recipe Helper tool](https://bert-0327.github.io/recipe-helper/Recipe%20Helper.html)** to create, save, and use your own recipes.
- **[Open the introduction and interactive preview](https://bert-0327.github.io/recipe-helper/)** for cooking tips, a guide, and sample recipes you can try. The preview does not save your own recipes.

## Add a recipe

Click **+ New recipe**, then choose one of these options.

### Manual entry: type a recipe yourself

1. Choose **Manual entry** to open a blank recipe form.
2. Enter the recipe name and **Original yield**: how much the recipe normally makes. For example, enter `4` and use `servings` as the yield label.
3. Add each ingredient's name, amount, and unit, such as `rice`, `2`, and `cups`. Use **+ Add ingredient** for more rows.
4. Add the cooking instructions. You can also enter a **Recipe family**, such as Pasta or Cookies, to group similar recipes.
5. Click **Save recipe**.

Ingredient amounts can be numbers or fractions, such as `0.5`, `1/2`, or `1 1/2`.

### Easy fill in: start with recipe text

1. Choose **Easy fill in**.
2. Paste the recipe text into **Recipe text**. Use the format below for the best results.
3. Click **Fill recipe form**. The helper fills in the parts it recognizes.
4. Check and correct the recipe name, original yield and label, ingredient names, amounts, units, and cooking steps. Add a recipe family if you want one.
5. Read the review notes and compare the form with **Original pasted text**. Fill in any missing amounts or yield. Check any text the helper could not place.
6. Click **Save recipe** when the form is ready.

**Filling the form does not save the recipe. You must click Save recipe.**

For quick help, point to the **?** beside Easy fill in, move keyboard focus to it, or click or tap it. Open **Formatting guide and example** in the paste panel for more help.

### A format you can copy

Put the recipe name and yield first, then list the ingredients and cooking steps in separate sections:

```text
Simple rice bowl
Serves: 2

Ingredients
2 cups cooked rice
1 tbsp soy sauce

Instructions
1. Heat the cooked rice until hot.
2. Stir in the soy sauce and serve.
```

### Tips for Easy fill in

- Use English headings. **Ingredients** or **What you'll need** works for ingredients. **Instructions**, **Directions**, **Method**, **Steps**, or **Preparation** works for cooking steps.
- Put the title on the first line. Before the sections, add a yield such as `Serves: 2`, `Makes: 8 pieces`, or `Yield: 8 pieces`.
- Put one ingredient on each line: **amount, unit, then ingredient name**. For example, `2 cups cooked rice`. Common units include cups, tbsp, tsp, g, ml, cans, and sheets.
- Decimals and fractions work, including `0.5`, `1/2`, `1 1/2`, and `½`.
- Check ranges such as `1–2 cups`, unclear amounts such as `a little` or `to taste`, unfamiliar units, and package sizes yourself. Missing or unclear amounts are left blank or marked for review, rather than guessed.
- Clear measured ingredients and numbered steps can sometimes work without headings, but organized sections work best. Always review the filled form.
- Paste recipe text, rather than a website address or video link. You can paste up to **30,000 characters**.

Easy fill in looks for patterns in the text in your browser. It does not use AI, open links, watch videos, or translate recipes. You do not need an API key or a separate server.

For saved imports, open **Original text and import notes** to see the source again. These notes describe the first fill-in attempt; they remain for reference after you correct the recipe. The source text and notes are also included in exported backups.

## Open or hide a saved recipe

- Click a recipe in the sidebar to show its details. Click it again to hide them. With the button focused, you can also press **Enter** or **Space**.
- Opening **Easy fill in** hides saved recipe details at first, giving you room to paste text.
- To check a saved recipe while working, click it in the sidebar. Its details appear above the paste or recipe form, and the page moves to them.
- Showing or hiding saved details keeps your pasted text and unsaved form fields. Hiding and reopening the same recipe also keeps its chosen amount for scaling. Choosing a different recipe starts with that recipe's original yield.

Unsaved work is still a draft. Click **Save recipe** before leaving or refreshing the page if you want to keep the recipe.

## Change how much you want to make

1. Open a saved recipe.
2. Change **How much do you want to make?**
3. Use the **You need** column for the new ingredient amounts.

The tool changes each ingredient amount by the same proportion. It does not change cooking time or oven temperature, and it does not convert between units.

## Make and compare a variation

1. Open a saved recipe and click **Create variation**.
2. Give the new version a name, change the ingredients or steps, and keep the same **Recipe family**.
3. Click **Save recipe**.
4. Open a recipe in that family and use **Compare a variation** to choose a related recipe.

Both recipes are compared at the amount you selected. Check that their yield labels describe comparable portions, especially if one uses servings and another uses pieces.

## Try the introduction and preview

On the [introduction and preview page](https://bert-0327.github.io/recipe-helper/):

1. Read the cooking tips and guide.
2. Scroll to the tool preview and click a sample recipe.
3. Change the desired servings to see ingredient amounts change.
4. Choose **Tomato Pasta** or **Garlic Cream Pasta** to compare two recipes in the Pasta family.

The samples are for trying the preview. Use the full tool to build your own recipe book.

## Save and back up your recipes

Your saved recipes stay in the browser you use on that device. They do not automatically appear in another browser or on another device.

- Click **Export backup** to download a copy of your recipes.
- Click **Import backup** in the full tool to add recipes from that file. Existing recipes are kept.
- Export regularly, especially before clearing browser data or changing devices.

Website updates at the same address keep the existing recipe storage. To move recipes from a local file or demo to the website, export them there and import the backup into the full tool. Older versions can read the basic recipe fields, but editing imported recipes in an older version may remove their original text and import notes.

## Development checks

Run `node tests/parser.cjs` for parser and page integrity checks. Run `node tests/browser.cjs` with Playwright installed and Microsoft Edge available for isolated browser checks of saved recipes, imports, editing, scaling, variations, keyboard controls, backups, and narrow screens. Set `PLAYWRIGHT_CHANNEL` to use another installed Chromium browser channel. Test recipes use a separate browser session and do not enter the user's recipe book.
