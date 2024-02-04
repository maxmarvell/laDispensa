"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagRoutes = exports.iterationSchema = exports.iterationRoutes = exports.instructionSchemas = exports.instructionRoutes = exports.ingredientSchemas = exports.ingredientRoutes = exports.recipeSchemas = exports.recipeRoutes = exports.userSchemas = exports.userRoutes = void 0;
const user_route_1 = __importDefault(require("./user/user.route"));
exports.userRoutes = user_route_1.default;
const user_schema_1 = require("./user/user.schema");
Object.defineProperty(exports, "userSchemas", { enumerable: true, get: function () { return user_schema_1.userSchemas; } });
const recipe_route_1 = __importDefault(require("./recipe/recipe.route"));
exports.recipeRoutes = recipe_route_1.default;
const recipe_schema_1 = require("./recipe/recipe.schema");
Object.defineProperty(exports, "recipeSchemas", { enumerable: true, get: function () { return recipe_schema_1.recipeSchemas; } });
const ingredient_route_1 = __importDefault(require("./ingredient/ingredient.route"));
exports.ingredientRoutes = ingredient_route_1.default;
const ingredient_schema_1 = require("./ingredient/ingredient.schema");
Object.defineProperty(exports, "ingredientSchemas", { enumerable: true, get: function () { return ingredient_schema_1.ingredientSchemas; } });
const instruction_route_1 = __importDefault(require("./instruction/instruction.route"));
exports.instructionRoutes = instruction_route_1.default;
const instruction_schema_1 = require("./instruction/instruction.schema");
Object.defineProperty(exports, "instructionSchemas", { enumerable: true, get: function () { return instruction_schema_1.instructionSchemas; } });
const test_kitchen_route_1 = __importDefault(require("./test_kitchen/test.kitchen.route"));
exports.iterationRoutes = test_kitchen_route_1.default;
const test_kitchen_schema_1 = require("./test_kitchen/test.kitchen.schema");
Object.defineProperty(exports, "iterationSchema", { enumerable: true, get: function () { return test_kitchen_schema_1.iterationSchema; } });
const tags_route_1 = __importDefault(require("./tags/tags.route"));
exports.tagRoutes = tags_route_1.default;
