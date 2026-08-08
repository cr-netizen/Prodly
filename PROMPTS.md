# Week 7 – AI Prompt Log

## AI Feature

Product Description Generator using Google Gemini.

The user enters:

- Product Name
- Ingredients
- Weight
- Features
- Tone

The AI generates a professional product description for the product.

---

# Prompt Version 1

## Prompt

Generate a product description for the following product.

Product Name:
${productName}

Ingredients:
${ingredients}

Weight:
${weight}

Features:
${features}

Tone:
${tone}

## Example Input

Product Name:
Apple Jam

Ingredients:
Apple, Sugar

Weight:
500g

Features:
Homemade, No Preservatives

Tone:
Premium

## Example Output

Premium Apple Jam made from carefully selected fresh apples. Crafted with simple ingredients and no preservatives, this delicious spread offers a rich homemade taste perfect for breakfast, desserts, or snacks.

---

# Prompt Version 2

## Prompt

You are an expert food marketing copywriter.

Write a persuasive product description.

Include:

- premium language
- customer benefits
- natural ingredients
- call-to-action

Product:

Name:
${productName}

Ingredients:
${ingredients}

Weight:
${weight}

Features:
${features}

Tone:
${tone}

## Example Output

Experience the rich taste of our Premium Apple Jam. Made with fresh apples and carefully selected ingredients, it delivers authentic homemade flavor without preservatives. Perfect for toast, desserts, and everyday enjoyment. Taste the difference today!

---

# Prompt Version 3 (Final)

## Prompt

You are a professional FMCG marketing copywriter.

Generate a product description between 80 and 120 words.

Requirements:

- Mention the product name.
- Mention the ingredients naturally.
- Mention the weight.
- Highlight the features.
- Match the requested tone.
- Write fluent marketing English.
- Do not use bullet points.

Product Name:
${productName}

Ingredients:
${ingredients}

Weight:
${weight}

Features:
${features}

Tone:
${tone}

## Example Output

Premium Apple Jam is crafted from fresh apples and carefully selected ingredients to deliver rich homemade flavor in every spoonful. Packed in a convenient 500g jar, it contains no preservatives while maintaining authentic taste and quality. Perfect for breakfast, desserts, or snacks, it combines freshness, tradition, and premium craftsmanship to create a delicious experience for the whole family.

---

# Best Prompt

Prompt Version 3 produced the highest-quality descriptions because it clearly specified the AI's role, word count, writing style, and formatting requirements. It consistently included all important product details while maintaining a professional marketing tone. Compared to the earlier prompts, the responses were more natural, complete, and suitable for displaying directly in the application.