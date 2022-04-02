module Devs.Recipe exposing ( .. )

import List exposing (..)

--import Debug exposing (log)

import Devs.Objects as Objects exposing (..)

setTodoNr: Todo -> Int -> Todo
setTodoNr todo newVal = {todo | number = newVal}

setTodoText: Todo -> String -> Todo
setTodoText todo newVal = {todo | text = newVal}

setTodoImg: Todo -> String -> Todo
setTodoImg todo newVal = {todo | image = Just newVal}

setTodoImgComment: Todo -> String -> Todo
setTodoImgComment todo newVal = {todo | image_comment = Just newVal}

setSourceName: Maybe Source -> String -> Maybe Source
setSourceName source newVal = Maybe.andThen (\src -> Just { src | name = newVal }) source

setSourceIsbn: Maybe Source -> String -> Maybe Source
setSourceIsbn source newVal = Maybe.andThen (\src -> Just { src | isbn = Just newVal }) source

setSourceYear: Maybe Source -> String -> Maybe Source
setSourceYear source newVal = Maybe.andThen (\src -> Just { src | year = Just newVal }) source

setAikz: Maybe Recipe -> Int -> Maybe Recipe
setAikz recipe newVal = Maybe.andThen (\rec -> Just { rec | aikz = newVal }) recipe

setSize: Maybe Recipe -> String -> Maybe Recipe
setSize recipe newVal = Maybe.andThen (\rec -> Just { rec | nv_size = Just (Maybe.withDefault 0 <| String.toInt newVal)}) recipe

setSourcePage: Maybe Recipe -> String -> Maybe Recipe
setSourcePage recipe newVal = Maybe.andThen (\rec -> Just { rec | source_page = Just (Maybe.withDefault 0 <| String.toInt newVal) }) recipe

setNumber: Maybe Recipe -> String -> Maybe Recipe
setNumber recipe newVal = Maybe.andThen (\rec -> Just { rec | number = Just (Maybe.withDefault 0 <| String.toInt newVal) }) recipe

setName: Maybe Recipe -> String -> Maybe Recipe
setName recipe newVal = Maybe.andThen (\rec -> Just { rec | name = newVal }) recipe

setTranslate: Maybe Recipe -> String -> Maybe Recipe
setTranslate recipe newVal = Maybe.andThen (\rec -> Just { rec | translate = Just newVal }) recipe

setImage: Maybe Recipe -> Maybe String -> Maybe Recipe
setImage recipe newVal = Maybe.andThen (\rec -> Just { rec | image = newVal }) recipe

setNumberComment: Maybe Recipe -> String -> Maybe Recipe
setNumberComment recipe newVal = Maybe.andThen (\rec -> Just { rec | number_comment = Just newVal }) recipe

setCarbo: Maybe Recipe -> String -> Maybe Recipe
setCarbo recipe newVal = Maybe.andThen (\rec -> Just { rec | nv_carbohydrates = Just (Maybe.withDefault 0 <| String.toFloat newVal) }) recipe

setEnergy: Maybe Recipe -> String -> Maybe Recipe
setEnergy recipe newVal = Maybe.andThen (\rec -> Just { rec | nv_energy = Just (Maybe.withDefault 0 <| String.toFloat newVal) }) recipe

setFat: Maybe Recipe -> String -> Maybe Recipe
setFat recipe newVal = Maybe.andThen (\rec -> Just { rec | nv_fat = Just (Maybe.withDefault 0 <| String.toFloat newVal) }) recipe

setProt: Maybe Recipe -> String -> Maybe Recipe
setProt recipe newVal = Maybe.andThen (\rec -> Just { rec | nv_protein = Just (Maybe.withDefault 0 <| String.toFloat newVal) }) recipe

setSource: Maybe Recipe -> Source -> Maybe Recipe
setSource recipe newSource = Maybe.andThen (\rec -> Just { rec | source = Just newSource }) recipe

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
addToIngredients recipe newIngre = Maybe.andThen (\rec -> Just { rec | ingredients = List.concat [ rec.ingredients, [newIngre] ] }) recipe

setTodos: Maybe Recipe -> List Todo -> Maybe Recipe
setTodos recipe newTodoList = Maybe.andThen (\rec -> Just { rec | todos = newTodoList }) recipe

addToTodos: Maybe Recipe -> Todo -> Maybe Recipe
addToTodos recipe newTodo = Maybe.andThen (\rec -> Just { rec | todos = List.concat [ rec.todos, [newTodo] ] }) recipe

setTags: Maybe Recipe -> List Tag -> Maybe Recipe
setTags recipe newTagList = Maybe.andThen (\rec -> Just { rec | tags = newTagList }) recipe

addToTags: Maybe Recipe -> Tag -> Maybe Recipe
addToTags recipe newTag = Maybe.andThen (\rec -> Just { rec | tags = List.concat [ rec.tags, [newTag] ] }) recipe

{-
type alias Recipe = {
  tags: Maybe (List Tag),
}
-}
