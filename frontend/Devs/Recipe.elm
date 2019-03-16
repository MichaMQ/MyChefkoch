module Devs.Recipe exposing ( .. )

import Http
import Json.Decode as Decode exposing (Decoder, field, succeed)
import Json.Encode as Encode exposing (..)
import List exposing (..)

import Debug exposing (log)

import Devs.Objects as Objects exposing (..)

import Devs.RecipeDecode as RD exposing (sourceEncoder,recipeEncoder,imageEncoder,tagtypeDecoder,recipeLightDecoder,recipeDecoder,unitDecoder,sourceDecoder,tagDecoder)

uploadImage: (Result Http.Error (Bool) -> Msg) -> String -> ImagePortData -> Cmd Msg
uploadImage event url image =
  let
    jsonValue = RD.imageEncoder image
    _ = Debug.log "src-url: " url
  in
--    Http.send event (Http.post url (Http.jsonBody jsonValue) Decode.bool)
    Http.post {url=url, body=(Http.jsonBody jsonValue), expect=Http.expectJson event Decode.bool}

saveRecipe: (Result Http.Error (Recipe) -> Msg) -> String -> Recipe -> Cmd Msg
saveRecipe event url newRecipe =
  let
    jsonValue = RD.recipeEncoder newRecipe
    _ = Debug.log "src-url: " url
  in
--    Http.send event (Http.post url (Http.jsonBody jsonValue) recipeDecoder)
    Http.post {url=url, body=(Http.jsonBody jsonValue), expect=Http.expectJson event recipeDecoder}

saveSource: (Result Http.Error (Source) -> Msg) -> String -> Source -> Cmd Msg
saveSource event url newSource =
  let
    jsonValue = RD.sourceEncoder newSource
    _ = Debug.log "src-url: " url
  in
--    Http.send event (Http.post url (Http.jsonBody jsonValue) sourceDecoder)
    Http.post {url=url, body=(Http.jsonBody jsonValue), expect=Http.expectJson event sourceDecoder}

getAllUnits: (Result Http.Error (List Unit) -> Msg) -> String -> Cmd Msg
--getAllUnits event url = Http.send event (Http.get url (Decode.list RD.unitDecoder))
getAllUnits event url = Http.get {url=url, expect=Http.expectJson event (Decode.list RD.unitDecoder)}

getAllSources: (Result Http.Error (List Source) -> Msg) -> String -> Cmd Msg
--getAllSources event url = Http.send event (Http.get url (Decode.list RD.sourceDecoder))
getAllSources event url = Http.get {url=url, expect=Http.expectJson event (Decode.list RD.sourceDecoder)}

getAllTags: (Result Http.Error (List Tag) -> Msg) -> String -> Cmd Msg
--getAllTags event url = Http.send event (Http.get url (Decode.list RD.tagDecoder))
getAllTags event url = Http.get {url=url, expect=Http.expectJson event (Decode.list RD.tagDecoder)}

getTagtypeListForOverview: (Result Http.Error (List Tagtype) -> Msg) -> String -> Cmd Msg
--getTagtypeListForOverview event url = Http.send event (Http.get url (Decode.list RD.tagtypeDecoder))
getTagtypeListForOverview event url = Http.get {url=url, expect=Http.expectJson event (Decode.list RD.tagtypeDecoder)}

getRecipeListForTag : (Result Http.Error (List RecipeLight) -> Msg) -> String -> Cmd Msg
--getRecipeListForTag event url = Http.send event (Http.get url (Decode.list RD.recipeLightDecoder))
getRecipeListForTag event url = Http.get {url=url, expect=Http.expectJson event (Decode.list RD.recipeLightDecoder)}

searchRecipe: (Result Http.Error (List RecipeLight) -> Msg) -> String -> Cmd Msg
--searchRecipe event url = Http.send event (Http.get url (Decode.list RD.recipeLightDecoder))
searchRecipe event url = Http.get {url=url, expect=Http.expectJson event (Decode.list RD.recipeLightDecoder)}

getRecipe: (Result Http.Error (Recipe) -> Msg) -> String -> Cmd Msg
--getRecipe event url = Http.send event (Http.get url RD.recipeDecoder)
getRecipe event url = Http.get {url=url, expect=Http.expectJson event RD.recipeDecoder}

setIngreOrder: Ingredient -> Int -> Ingredient
setIngreOrder ingre newVal = {ingre | sortorder = newVal}

setIngreComment: Ingredient -> String -> Ingredient
setIngreComment ingre newVal = {ingre | comment = Just newVal}

setIngreName: Ingredient -> String -> Ingredient
setIngreName ingre newVal = {ingre | name = newVal}

setIngreQuant: Ingredient -> Float -> Ingredient
setIngreQuant ingre newVal = {ingre | quantity = Just newVal}

setIngrePart: Ingredient -> Int -> Ingredient
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
--    Just rec -> Just { rec | nv_size = Just (Result.withDefault 0 (String.toInt newVal)) }
    Nothing -> Nothing

setSourcePage: Maybe Recipe -> String -> Maybe Recipe
setSourcePage recipe newVal =
  case recipe of
    Just rec -> Just { rec | source_page = Just (Maybe.withDefault 0 <| String.toInt newVal) }
--    Just rec -> Just { rec | source_page = Just (Result.withDefault 0 (String.toInt newVal)) }
    Nothing -> Nothing

setNumber: Maybe Recipe -> String -> Maybe Recipe
setNumber recipe newVal =
  case recipe of
    Just rec -> Just { rec | number = Just (Maybe.withDefault 0 <| String.toInt newVal) }
--    Just rec -> Just { rec | number = Just (Result.withDefault 0 (String.toInt newVal)) }
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
--    Just rec -> Just { rec | nv_carbohydrates = Just (Result.withDefault 0 (String.toFloat newVal)) }
    Nothing -> Nothing

setEnergy: Maybe Recipe -> String -> Maybe Recipe
setEnergy recipe newVal =
  case recipe of
    Just rec -> Just { rec | nv_energy = Just (Maybe.withDefault 0 <| String.toFloat newVal) }
--    Just rec -> Just { rec | nv_energy = Just (Result.withDefault 0 (String.toFloat newVal)) }
    Nothing -> Nothing

setFat: Maybe Recipe -> String -> Maybe Recipe
setFat recipe newVal =
  case recipe of
    Just rec -> Just { rec | nv_fat = Just (Maybe.withDefault 0 <| String.toFloat newVal) }
--    Just rec -> Just { rec | nv_fat = Just (Result.withDefault 0 (String.toFloat newVal)) }
    Nothing -> Nothing

setProt: Maybe Recipe -> String -> Maybe Recipe
setProt recipe newVal =
  case recipe of
    Just rec -> Just { rec | nv_protein = Just (Maybe.withDefault 0 <| String.toFloat newVal) }
--    Just rec -> Just { rec | nv_protein = Just (Result.withDefault 0 (String.toFloat newVal)) }
    Nothing -> Nothing

setSource: Maybe Recipe -> Source -> Maybe Recipe
setSource recipe newSource =
  case recipe of
    Just rec -> Just { rec | source = Just newSource }
    Nothing -> Nothing

setIngredients: Maybe Recipe -> List Ingredient -> Maybe Recipe
setIngredients recipe newIngreList =
  case recipe of
    Just rec -> Just { rec | ingredients = Just newIngreList }
    Nothing -> Nothing

addToIngredients: Maybe Recipe -> Ingredient -> Maybe Recipe
addToIngredients recipe newIngre =
  case recipe of
    Just rec ->
      let
        ingreList = case rec.ingredients of
          Just ingre -> ingre
          Nothing -> []
      in
        Just { rec | ingredients = Just (List.concat [ ingreList, [newIngre] ]) }
    Nothing -> Nothing

setTodos: Maybe Recipe -> List Todo -> Maybe Recipe
setTodos recipe newTodoList =
  case recipe of
    Just rec -> Just { rec | todos = Just newTodoList }
    Nothing -> Nothing

addToTodos: Maybe Recipe -> Todo -> Maybe Recipe
addToTodos recipe newTodo =
  case recipe of
    Just rec ->
      let
        todoList = case rec.todos of
          Just todo -> todo
          Nothing -> []
      in
        Just { rec | todos = Just (List.concat [ todoList, [newTodo] ]) }
    Nothing -> Nothing

setTags: Maybe Recipe -> List Tag -> Maybe Recipe
setTags recipe newTagList =
  case recipe of
    Just rec -> Just { rec | tags = Just newTagList }
    Nothing -> Nothing

addToTags: Maybe Recipe -> Tag -> Maybe Recipe
addToTags recipe newTag =
  case recipe of
    Just rec ->
      let
        tagList = case rec.tags of
          Just tags -> tags
          Nothing -> []
      in
        Just { rec | tags = Just (List.concat [ tagList, [newTag] ]) }
    Nothing -> Nothing

{-
type alias Recipe = {
  tags: Maybe (List Tag),
}
-}
