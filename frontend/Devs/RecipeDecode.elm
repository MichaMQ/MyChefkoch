module Devs.RecipeDecode exposing ( tagtypeDecoder,recipeLightDecoder,recipeDecoder,unitDecoder,sourceDecoder,tagDecoder,partLightDecoder )

import Json.Decode as Decode exposing (Decoder, field, succeed)
import Json.Decode.Extra exposing (andMap)
--import Json.Encode as Encode exposing (..)
--import Json.Encode.Extra as JsonE exposing (..)

import Devs.Objects as Objects exposing (..)

tagtypeShortDecoder : Decoder TagtypeShort
tagtypeShortDecoder = Decode.map2 TagtypeShort
  (Decode.maybe <| field "id" Decode.int)
  (field "name" Decode.string)

tagDecoder : Decoder Tag
tagDecoder = Decode.map3 Tag
  (Decode.maybe <| field "id" Decode.int)
  (field "name" Decode.string)
  (field "tagtype" tagtypeShortDecoder)

tagListDecoder : Decoder (List Tag)
tagListDecoder =
  Decode.list tagDecoder

tagtypeDecoder : Decoder Tagtype
tagtypeDecoder =
  Decode.map3 Tagtype
    (field "id" Decode.int)
    (field "name" Decode.string)
    (field "tagList" tagListDecoder)

ingrDecoder : Decoder Ingredient
ingrDecoder = Decode.map7 Ingredient
  (Decode.maybe <| field "id" Decode.int)
  (field "name" Decode.string)
  (Decode.maybe <| field "comment" Decode.string)
  (Decode.maybe <| field "part" partLightDecoder)
  (Decode.maybe <| field "quantity" Decode.float)
  (field "sortorder" Decode.int)
  (Decode.maybe <| field "unit" unitDecoder)

ingrListDecoder : Decoder (List Ingredient)
ingrListDecoder =
  Decode.list ingrDecoder

partListDecoder : Decoder (List Part)
partListDecoder =
  Decode.list partDecoder

partDecoder : Decoder Part
partDecoder =
  Decode.map3 Part
    (field "id" Decode.int)
    (field "name" Decode.string)
    (field "ingredients" ingrListDecoder)

partLightDecoder : Decoder PartLight
partLightDecoder =
  Decode.map2 PartLight
    (field "id" Decode.int)
    (field "name" Decode.string)

unitDecoder : Decoder Unit
unitDecoder = Decode.map3 Unit
  (field "id" Decode.int)
  (field "name" Decode.string)
  (field "unitCategory" unitCategoryDecoder)

unitCategoryDecoder : Decoder UnitCategory
unitCategoryDecoder = Decode.map2 UnitCategory
  (field "id" Decode.int)
  (field "name" Decode.string)

sourceDecoder : Decoder Source
sourceDecoder = Decode.map4 Source
  (Decode.maybe <| field "id" Decode.int)
  (Decode.maybe <| field "isbn" Decode.string)
  (field "name" Decode.string)
  (Decode.maybe <| field "year" Decode.string)

todoDecoder : Decoder Todo
todoDecoder = Decode.map5 Todo
  (field "id" Decode.int)
  (Decode.maybe <| field "image" Decode.string)
  (Decode.maybe <| field "image_comment" Decode.string)
  (field "number" Decode.int)
  (field "text" Decode.string)

todoListDecoder : Decoder (List Todo)
todoListDecoder = Decode.list todoDecoder

recipeLightDecoder : Decoder RecipeLight
recipeLightDecoder = Decode.map2 RecipeLight
  (field "id" Decode.int)
  (field "name" Decode.string)

recipeDecoder : Decode.Decoder Recipe
recipeDecoder =
    Decode.succeed Recipe
    |> andMap (Decode.field "aikz" Decode.int)
    |> andMap (Decode.field "id" (Decode.maybe Decode.int))
    |> andMap (Decode.field "image" (Decode.maybe Decode.string))
    |> andMap (Decode.field "ingredients" (Decode.maybe ingrListDecoder))
    |> andMap (Decode.field "parts" (Decode.maybe partListDecoder))
    |> andMap (Decode.field "name" Decode.string)
    |> andMap (Decode.field "translate" (Decode.maybe Decode.string))
    |> andMap (Decode.field "number" (Decode.maybe Decode.int))
    |> andMap (Decode.field "number_comment" (Decode.maybe Decode.string))
    |> andMap (Decode.field "nv_carbohydrates" (Decode.maybe Decode.float))
    |> andMap (Decode.field "nv_energy" (Decode.maybe Decode.float))
    |> andMap (Decode.field "nv_fat" (Decode.maybe Decode.float))
    |> andMap (Decode.field "nv_protein" (Decode.maybe Decode.float))
    |> andMap (Decode.field "nv_size" (Decode.maybe Decode.int))
    |> andMap (Decode.field "source" (Decode.maybe sourceDecoder))
    |> andMap (Decode.field "source_page" (Decode.maybe Decode.int))
    |> andMap (Decode.field "tags" (Decode.maybe tagListDecoder))
    |> andMap (Decode.field "todos" (Decode.maybe todoListDecoder))
