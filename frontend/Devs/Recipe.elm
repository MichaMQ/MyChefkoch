module Devs.Recipe exposing ( .. )

import List exposing (..)

--import Debug exposing (log)

import Devs.Objects as Objects exposing (..)

setIngreOrder: Ingredient -> Int -> Ingredient
setIngreOrder ingre newVal = {ingre | sortorder = newVal}

setIngreComment: Ingredient -> String -> Ingredient
setIngreComment ingre newVal = {ingre | comment = Just newVal}

setIngreName: Ingredient -> String -> Ingredient
setIngreName ingre newVal = {ingre | name = newVal}

setIngreQuant: Ingredient -> Float -> Ingredient
setIngreQuant ingre newVal = {ingre | quantity = Just newVal}

setIngrePart: Ingredient -> PartLight -> Ingredient
setIngrePart ingre newVal = {ingre | part = Just newVal}

setIngreUnit: Ingredient -> Unit -> Ingredient
setIngreUnit ingre newVal = {ingre | unit = Just newVal}

setTodoNr: Todo -> Int -> Todo
setTodoNr todo newVal = {todo | number = newVal}

setTodoText: Todo -> String -> Todo
setTodoText todo newVal = {todo | text = newVal}

setTodoImg: Todo -> String -> Todo
setTodoImg todo newVal = {todo | image = Just newVal}

setTodoImgComment: Todo -> String -> Todo
setTodoImgComment todo newVal = {todo | image_comment = Just newVal}

setSourceName: Maybe Source -> String -> Maybe Source
setSourceName source newVal =
  case source of
    Just src -> Just { src | name = newVal }
    Nothing -> Nothing

setSourceIsbn: Maybe Source -> String -> Maybe Source
setSourceIsbn source newVal =
  case source of
    Just src -> Just { src | isbn = Just newVal }
    Nothing -> Nothing

setSourceYear: Maybe Source -> String -> Maybe Source
setSourceYear source newVal =
  case source of
    Just src -> Just { src | year = Just newVal }
    Nothing -> Nothing

setAikz: Maybe Recipe -> Int -> Maybe Recipe
setAikz recipe newVal =
  case recipe of
    Just rec -> Just { rec | aikz = newVal }
    Nothing -> Nothing

setSize: Maybe Recipe -> String -> Maybe Recipe
setSize recipe newVal =
  case recipe of
    Just rec -> Just { rec | nv_size = Just (Maybe.withDefault 0 <| String.toInt newVal)}
    Nothing -> Nothing

setSourcePage: Maybe Recipe -> String -> Maybe Recipe
setSourcePage recipe newVal =
  case recipe of
    Just rec -> Just { rec | source_page = Just (Maybe.withDefault 0 <| String.toInt newVal) }
    Nothing -> Nothing

setNumber: Maybe Recipe -> String -> Maybe Recipe
setNumber recipe newVal =
  case recipe of
    Just rec -> Just { rec | number = Just (Maybe.withDefault 0 <| String.toInt newVal) }
    Nothing -> Nothing

setName: Maybe Recipe -> String -> Maybe Recipe
setName recipe newVal =
  case recipe of
    Just rec -> Just { rec | name = newVal }
    Nothing -> Nothing

setTranslate: Maybe Recipe -> String -> Maybe Recipe
setTranslate recipe newVal =
  case recipe of
    Just rec -> Just { rec | translate = Just newVal }
    Nothing -> Nothing

setImage: Maybe Recipe -> Maybe String -> Maybe Recipe
setImage recipe newVal =
  case recipe of
    Just rec -> Just { rec | image = newVal }
    Nothing -> Nothing

setNumberComment: Maybe Recipe -> String -> Maybe Recipe
setNumberComment recipe newVal =
  case recipe of
    Just rec -> Just { rec | number_comment = Just newVal }
    Nothing -> Nothing

setCarbo: Maybe Recipe -> String -> Maybe Recipe
setCarbo recipe newVal =
  case recipe of
    Just rec -> Just { rec | nv_carbohydrates = Just (Maybe.withDefault 0 <| String.toFloat newVal) }
    Nothing -> Nothing

setEnergy: Maybe Recipe -> String -> Maybe Recipe
setEnergy recipe newVal =
  case recipe of
    Just rec -> Just { rec | nv_energy = Just (Maybe.withDefault 0 <| String.toFloat newVal) }
    Nothing -> Nothing

setFat: Maybe Recipe -> String -> Maybe Recipe
setFat recipe newVal =
  case recipe of
    Just rec -> Just { rec | nv_fat = Just (Maybe.withDefault 0 <| String.toFloat newVal) }
    Nothing -> Nothing

setProt: Maybe Recipe -> String -> Maybe Recipe
setProt recipe newVal =
  case recipe of
    Just rec -> Just { rec | nv_protein = Just (Maybe.withDefault 0 <| String.toFloat newVal) }
    Nothing -> Nothing

setSource: Maybe Recipe -> Source -> Maybe Recipe
setSource recipe newSource =
  case recipe of
    Just rec -> Just { rec | source = Just newSource }
    Nothing -> Nothing

setParts: Maybe Recipe -> PartLight -> Maybe Recipe
setParts recipe part =
  let
    rec = case recipe of
      Just r -> r
      Nothing -> Objects.getEmptyRecipe
    pl = if List.length (List.filter (\item -> (hasIngreWithThisPart item part.uuid)) rec.ingredients) > 0
      then rec.parts
      else List.append rec.parts [Objects.getPartOfPartLight part]
  in
    Just { rec | parts = pl }

hasIngreWithThisPart: Ingredient -> String -> Bool
hasIngreWithThisPart ingre pUuid =
  case ingre.part of
      Just pl -> if pl.uuid == pUuid then True else False
      Nothing -> False

setIngredients: Maybe Recipe -> List Ingredient -> Maybe Recipe
setIngredients recipe newIngreList =
  let
    rec = case recipe of
      Just r -> { r | ingredients = newIngreList }
      Nothing -> Objects.getEmptyRecipe
    newPartList = List.map (setIngreToPart rec.ingredients) rec.parts
  in
    Just { rec | parts = newPartList }

setIngreToPart: (List Ingredient) -> Part -> Part
setIngreToPart ingreList part =
  { part | ingredients = List.filter (\item -> (hasIngreWithThisPart item part.uuid)) ingreList}

addToIngredients: Maybe Recipe -> Ingredient -> Maybe Recipe
addToIngredients recipe newIngre =
  case recipe of
    Just rec -> Just { rec | ingredients = List.concat [ rec.ingredients, [newIngre] ] }
    Nothing -> Nothing

setTodos: Maybe Recipe -> List Todo -> Maybe Recipe
setTodos recipe newTodoList =
  case recipe of
    Just rec -> Just { rec | todos = newTodoList }
    Nothing -> Nothing

addToTodos: Maybe Recipe -> Todo -> Maybe Recipe
addToTodos recipe newTodo =
  case recipe of
    Just rec -> Just { rec | todos = List.concat [ rec.todos, [newTodo] ] }
    Nothing -> Nothing

setTags: Maybe Recipe -> List Tag -> Maybe Recipe
setTags recipe newTagList =
  case recipe of
    Just rec -> Just { rec | tags = newTagList }
    Nothing -> Nothing

addToTags: Maybe Recipe -> Tag -> Maybe Recipe
addToTags recipe newTag =
  case recipe of
    Just rec -> Just { rec | tags = List.concat [ rec.tags, [newTag] ] }
    Nothing -> Nothing

{-
type alias Recipe = {
  tags: Maybe (List Tag),
}
-}
