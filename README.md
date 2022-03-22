# manzai

A markup language for narratives

## Basic syntax

### Narrative

To create a narrative, add a name in front of a sentence, split with a colon and a space `: `.

```manzai
Socrates: All men are mortal
```

You can add a slash `/` in front of the name, representing that the narrator is subjective.

```manzai
/Plato: Socrates is a man
```

You can add a back slash `\` in front of the name, representing that the narrator is objective.

```manzai
\Socrates: Therefore, Socrates is mortal
```

Without a name, the sentence represents that it is directive.

```manzai
Socrates died by drinking poison hemlock.
```

### Media

You can represent a media by wrapping link text in brackets `[ ]`,

```manzai
[https://picsum.photos/200]
```

You can represent a media in a narrative.

```manzai
Plato: [https://picsum.photos/200]
```

## Header

You can add a YAML front matter block, which must be the first thing in the file and must take the form of valid YAML set between triple-dashed lines.

```manzai
---
title: Syllogismus
description: An example featuring Socrates and Plato
---
```

## Narrator

In a header, you can assign avatars and other properties in `narrators` collection with each name as a key.

```manzai
---
narrators:
  - name: Socrates
    type: 2
    avatar: [https://picsum.photos/200]
---
```

Type number represents whether the narrator is subjective, objective or descriptive.

- 0: descriptive.
- 1: subjective
- 2: objective

If you represent a type explicitly in a line with `/` or `\`, types assigned to narrators in a header are overwritten.

## Parsed result

A parsed result is consisted of `header` and `contents`.

`contents` is a collection of `content`.

### header

A `header` contains properties which is declared in a YAML front matter block.

### contents

Each content in `contents` has properties as below:

| property | type     |
| -------- | -------- |
| name     |  string  |
| type     |  number  |
| avatar   |  string  |
| message  |  string  |
| media    |  string  |

## Licence

This project is licensed under the terms of the [MIT license](https://opensource.org/licenses/MIT).
