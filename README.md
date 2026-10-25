# Recipe Helper

Recipe Helper helps you save recipes, change how much you want to make, and compare different versions of a recipe.

## Choose a page

### [Open the full Recipe Helper tool](https://bert-0327.github.io/recipe-helper/Recipe%20Helper.html)

Use this page to create and save your own recipes. You can change ingredient amounts and compare recipes in the same family.

**How to use the tool:**

1. Click **+ New recipe**, then **Manual entry** for a blank form, or **Easy fill in** to paste recipe text.
2. Enter the recipe name, how much it makes, the ingredients, and the instructions.
3. Add a **Recipe family** if you want to group similar recipes, such as Pasta or Cookies.
4. Click **Save recipe**.
5. Select a saved recipe and change **How much do you want to make?** The tool changes each ingredient amount for you.
6. To make a different version, click **Create variation**, change what you need, and save it. Keep the same recipe family to compare the two versions under **Compare a variation**.

You can enter ingredient amounts as numbers or fractions, such as `0.5`, `1/2`, or `1 1/2`. Cooking time and oven temperature do not change automatically.

**Easy fill in:**

1. Paste organized English recipe text, with the title and yield first, then **Ingredients** and **Instructions** headings. Put one ingredient on each line, such as `2 cups cooked rice`.
2. Click **Fill recipe form**. Check and edit the recipe name, yield, ingredients, units, and steps.
3. Fill any missing amounts or yield, then click **Save recipe**. Filling the form does not save anything.

Use the **?** beside Easy fill in for quick help, or open **Formatting guide and example** in the paste panel. Help works with a mouse, keyboard, or tap. Decimals, fractions, and common units are supported. Ranges, amounts such as “to taste,” unfamiliar units, messy captions, and non-English headings need manual review. This helper uses simple pattern matching in your browser; it does not use AI, open links, or watch videos. Text is limited to 30,000 characters.

The full original text and import notes stay available with saved imports and in exported backups. Notes describe the first import and remain as a reference after you correct the form.

Click a saved recipe in the sidebar to show its details; click again to hide them. You can also use Enter or Space. Opening Easy fill in initially hides saved details. Reopening a recipe displays it above the form and brings it into view. Showing or hiding recipes keeps your pasted text and unsaved form fields; reopening the same recipe also keeps its scaling amount.

### [Open the introduction and interactive preview](https://bert-0327.github.io/recipe-helper/)

Use this page to learn about Recipe Helper before using the full tool. It includes basic cooking tips, a guide, and sample recipes you can click.

**How to use the preview:**

1. Read the cooking tips and the guide.
2. Scroll down to the tool preview.
3. Click a sample recipe, such as **Tomato Pasta** or **Garlic Cream Pasta**.
4. Change the desired servings to see the ingredient amounts change.
5. Choose a Pasta recipe to see how two recipes in the same family compare.

The preview uses sample recipes. It does not let you save your own recipes. Open the full tool when you are ready to make your own recipe book.

## Keep a backup of your recipes

The full tool saves recipes in the browser you use on that device. They do not automatically appear on another browser or device.

- Click **Export backup** to download a copy of your recipes.
- Click **Import backup** in the full tool to add recipes from a backup file. Your existing recipes are kept.

Export a backup regularly, especially before clearing browser data or moving to another device.

An update at the same website address keeps existing saved recipes. To move recipes from the local file or demo address to the website, export there and import here. Older versions can read the recipe fields in new backups, but editing an imported recipe in an older version can discard its original text and import notes.

## Development checks

Run `node tests/parser.cjs` for parser and page integrity checks. Run `node tests/browser.cjs` with Playwright installed and Microsoft Edge available for isolated browser checks of saved recipes, imports, editing, scaling, variations, keyboard controls, backups, and narrow screens. Set `PLAYWRIGHT_CHANNEL` to use another installed Chromium browser channel. Test recipes use a separate browser session and do not enter the user's recipe book.
