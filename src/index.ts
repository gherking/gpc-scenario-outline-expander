'use strict';

import { PreCompiler, ScenarioOutline, Tag } from "gherking";
import { ScenarioOutlineExpanderConfig } from "./types";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require("debug")("gpc:scenario-outline-expander");

const DEFAULT_CONFIG: ScenarioOutlineExpanderConfig = {
    ignoreTag: 'notExpand'
}

class ScenarioOutlineExpander implements PreCompiler {
    private config: ScenarioOutlineExpanderConfig;

    constructor(config?: ScenarioOutlineExpanderConfig) {
        debug("Initializing ScenarioOutline expander, config: %o", config);
        this.config = {
            ...DEFAULT_CONFIG,
            ...(config || {}),
        };
    };

    private isIgnoreTag(tag: Tag): boolean {
        return this.config.ignoreTag === tag.name;
    }

    // @ts-ignore
    onScenarioOutline(outline: ScenarioOutline) {
        debug("Expanding ScenarioOutlines with %s tag", this.config.ignoreTag)
        if (!outline.tags.length || !outline.tags.some((tag: Tag) => this.isIgnoreTag(tag))) {
            return outline.toScenario();
        }
        outline.tags = outline.tags.filter((tag: Tag) => !this.isIgnoreTag(tag));
    };
}

export = ScenarioOutlineExpander;