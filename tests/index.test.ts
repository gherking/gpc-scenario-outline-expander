'use strict';

import { load, process } from "gherking";
import { Document, pruneID } from "gherkin-ast";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ScenarioOutlineExpander = require("../src")

const loadTestFeatureFile = async (file: string): Promise<Document> => {
    const ast: Document[] = pruneID(await load(`./tests/data/${file}`)) as Document[];
    delete ast[0].uri;
    return ast[0];
}

describe("Scenario Outline Expander", () => {
    let base: Document;

    beforeAll(async () => {
        base = await loadTestFeatureFile("input.feature");
    });

    test("should expand scenario outline with default config", async () => {
        const expected = await loadTestFeatureFile("expected.1.feature");
        const actual = pruneID(process(base, new ScenarioOutlineExpander())) as Document[];
        expect(actual[0]).toEqual(expected);
    });

    test("should expand scenario outline with custom config", async () => {
        const expected = await loadTestFeatureFile("expected.2.feature");
        const actual = pruneID(process(base, new ScenarioOutlineExpander({
            ignoreTag: '@expand'
        }))) as Document[];
        expect(actual[0]).toEqual(expected);
    });
})