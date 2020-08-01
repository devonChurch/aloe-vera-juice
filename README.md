# Aloe Vera Juice 🧃🌵😋

## What 👋

An experiment to augment an application by both **Business Skew** and **Language** while leveraging a single codebase.

## Why 🤔

When scaling out an application to facilitate new audience opportunities, reusability is essential to experiment, pivot, and deliver features quickly.

## How 💡

We use a traditional I18n pattern to abstract content from the application UI and Business Logic. We can then create a new layer that, in addition to Language, allows the differentiation of **Business Skew** too.

We use an enrichment pattern so that a Base **Language** _(like English)_ can be enriched by Business Skew specific requirements. This keeps duplication to a minimum and encourages **Business Skew** content to focus on their unique properties only.

### Example:

Load the School sub-domain and request the German content skew.

![School -vs- German](https://user-images.githubusercontent.com/15273233/89090085-bfb4ce80-d3f4-11ea-95b6-e4047ea21fdb.png)

Load the Home sub-domain and request the English content skew.

![Home -vs- English](https://user-images.githubusercontent.com/15273233/89090078-be83a180-d3f4-11ea-9ed7-13a9b98d02b6.png)

## Demo 📺

### Language
Users can change their application **Language** on the fly while retaining their original content, pluralization text, and UI selections.

![Language Demo](https://user-images.githubusercontent.com/15273233/89090213-8e88ce00-d3f5-11ea-91ed-984ede4ba6d3.gif)

### Business Skew
Changing the application subdomain pulls in the **Business Skew** content for the current **Language** route.

![Business Skew](https://user-images.githubusercontent.com/15273233/89090216-95174580-d3f5-11ea-80f6-84b3779a35d8.gif)

### Configurations

Below are the configurations _(**Business Skews** -vs- **Language**)_ that this exploration supports.

+ [School | English](https://school.devon.church/en)
+ [School | German](https://school.devon.church/de)
+ [Home | English](https://home.devon.church/en)
+ [Home | German](https://home.devon.church/de)
+ [Work | English](https://work.devon.church/en)
+ [Work | German](https://work.devon.church/de)