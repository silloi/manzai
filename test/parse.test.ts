import { parse } from "../src";
import { MESSAGE_TYPE } from "../src/enums";

const text1 = `

Socrates: All men are mortal

  /Plato: Socrates is a man

\\Socrates: Therefore, Socrates is mortal

Socrates is dead

[https://placeholder.com/400]
`

describe("text1 has no header", () => {
  const result = parse(text1);
  const header = result.header;
  const contents = result.contents;

  test("header is an empty object", () => {
    expect(header).toStrictEqual({});
  });

  test("the objective speaks", () => {
    expect(contents[0].type).toBe(MESSAGE_TYPE.OBJECTIVE);
    expect(contents[0].name).toBe("Socrates");
    expect(contents[0].avatar).toBeUndefined();
    expect(contents[0].message).toBe("All men are mortal");
    expect(contents[0].media).toBeUndefined();
  });

  test("the subjective speaks with leading spaces", () => {
    expect(contents[1].type).toBe(MESSAGE_TYPE.SUBJECTIVE);
    expect(contents[1].name).toBe("Plato");
    expect(contents[1].avatar).toBeUndefined();
    expect(contents[1].message).toBe("Socrates is a man");
    expect(contents[1].media).toBeUndefined();
  });

  test("the objective speaks with an initial back slash", () => {
    expect(contents[2].type).toBe(MESSAGE_TYPE.OBJECTIVE);
    expect(contents[2].name).toBe("Socrates");
    expect(contents[2].avatar).toBeUndefined();
    expect(contents[2].message).toBe("Therefore, Socrates is mortal");
    expect(contents[2].media).toBeUndefined();
  });

  test("the descriptive speaks", () => {
    expect(contents[3].type).toBe(MESSAGE_TYPE.DESCRIPTIVE);
    expect(contents[3].name).toBeUndefined();
    expect(contents[3].avatar).toBeUndefined();
    expect(contents[3].message).toBe("Socrates is dead");
    expect(contents[3].media).toBeUndefined();
  });

  test("the descriptive has a media", () => {
    expect(contents[4].type).toBe(MESSAGE_TYPE.DESCRIPTIVE);
    expect(contents[4].name).toBeUndefined();
    expect(contents[4].avatar).toBeUndefined();
    expect(contents[4].message).toBeUndefined();
    expect(contents[4].media).toBe("https://placeholder.com/400");
  });
});

const text2 = `
---
title: Syllogismus
narrators:
  - name: Plato
    type: 1
    avatar: https://example.com/image/plato
  - name: Socrates
    type: 2
    avatar: https://example.com/image/socrates
---

Socrates: All men are mortal

Plato: Socrates: a man

/Socrates: Therefore, Socrates is mortal

\\Plato: Socrates is dead

Socrates: [https://placeholder.com/400]
`

describe("text2 has a header", () => {
  const result = parse(text2);
  const header = result.header;
  const contents = result.contents;

  test("header has a title", () => {
    expect(header).toHaveProperty("title", "Syllogismus");
  });

  test("the objective speaks with an avatar", () => {
    expect(contents[0].type).toBe(MESSAGE_TYPE.OBJECTIVE);
    expect(contents[0].name).toBe("Socrates");
    expect(contents[0].avatar).toBe("https://example.com/image/socrates");
    expect(contents[0].message).toBe("All men are mortal");
    expect(contents[0].media).toBeUndefined();
  });

  test("the subjective speaks with an avatar and has an another colon in narrative", () => {
    expect(contents[1].type).toBe(MESSAGE_TYPE.SUBJECTIVE);
    expect(contents[1].name).toBe("Plato");
    expect(contents[1].avatar).toBe("https://example.com/image/plato");
    expect(contents[1].message).toBe("Socrates: a man");
    expect(contents[1].media).toBeUndefined();
  });

  test("the objective speaks, but overwritten as subjective in line", () => {
    expect(contents[2].type).toBe(MESSAGE_TYPE.SUBJECTIVE);
    expect(contents[2].name).toBe("Socrates");
    expect(contents[2].avatar).toBe("https://example.com/image/socrates");
    expect(contents[2].message).toBe("Therefore, Socrates is mortal");
    expect(contents[2].media).toBeUndefined();
  });

  test("the subjective speaks, but overwritten as objective in line", () => {
    expect(contents[3].type).toBe(MESSAGE_TYPE.OBJECTIVE);
    expect(contents[3].name).toBe("Plato");
    expect(contents[3].avatar).toBe("https://example.com/image/plato");
    expect(contents[3].message).toBe("Socrates is dead");
    expect(contents[3].media).toBeUndefined();
  });

  test("the objective has a media", () => {
    expect(contents[4].type).toBe(MESSAGE_TYPE.OBJECTIVE);
    expect(contents[4].name).toBe("Socrates");
    expect(contents[4].avatar).toBe("https://example.com/image/socrates");
    expect(contents[4].message).toBeUndefined();
    expect(contents[4].media).toBe("https://placeholder.com/400");
  });
});
