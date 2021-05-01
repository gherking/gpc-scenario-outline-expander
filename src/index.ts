'use strict';

import { PreCompiler, ScenarioOutline, Tag } from "gherking";
import { ScenarioOutlineExpanderConfig } from "./types";

const DEFAULT_CONFIG: ScenarioOutlineExpanderConfig = {
    ignoreTag: '@notExpand'
}

class ScenarioOutlineExpander implements PreCompiler {
    private config: ScenarioOutlineExpanderConfig;

    constructor(config?: ScenarioOutlineExpanderConfig) {
        this.config = {
            ...DEFAULT_CONFIG,
            ...(config || {}),
        };
    };

    onScenarioOutline(outline: ScenarioOutline) {
        if (!outline.tags.length || !outline.tags.some((tag: Tag) => this.config.ignoreTag === tag.name)) {
            return outline.toScenario();
        }
        outline.tags = outline.tags.filter((tag: Tag) => tag.name !== this.config.ignoreTag)
        return outline;
    };
}

export = ScenarioOutlineExpander; 