module Devs.RecipeDecode exposing ( tagtypeDecoder,recipeLightDecoder,recipeDecoder,unitDecoder,sourceDecoder,tagDecoder,partLightDecoder )

import Json.Decode as Decode exposing (Decoder, field, succeed)
import Json.Decode.Extra exposing (andMap)
--import Json.Encode as Encode exposing (..)
--import Json.Encode.Extra as JsonE exposing (..)

import Devs.Objects as Objects exposing (..)

tagtypeShortDecoder : Decoder TagtypeShort
tagtypeShortDecoder = Decode.map3 TagtypeShort
  (Decode.maybe <| field "id" Decode.int)
  (field "name" Decode.string)
  (field "uuid" Decode.string)

tagDecoder : Decoder Tag
tagDecoder = Decode.map4 Tag
  (Decode.maybe <| field "id" Decode.int)
  (field "name" Decode.string)
  (field "tagtype" tagtypeShortDecoder)
  (field "uuid" Decode.string)

tagListDecoder : Decoder (List Tag)
tagListDecoder =
  Decode.list tagDecoder

tagtypeDecoder : Decoder Tagtype
tagtypeDecoder =
  Decode.map4 Tagtype
    (field "id" Decode.int)
    (field "name" Decode.string)
    (field "tagList" tagListDecoder)
    (field "uuid" Decode.string)

ingrDecoder : Decoder Ingredient
ingrDecoder = Decode.map8 Ingredient
  (Decode.maybe <| field "id" Decode.int)
  (field "name" Decode.string)
  (Decode.maybe <| field "comment" Decode.string)
  (Decode.maybe <| field "part" partLightDecoder)
  (Decode.maybe <| field "quantity" Decode.float)
  (field "sortorder" Decode.int)
  (Decode.maybe <| field "unit" unitDecoder)
  (field "uuid" Decode.string)

ingrListDecoder : Decoder (List Ingredient)
ingrListDecoder =
  Decode.list ingrDecoder

partListDecoder : Decoder (List Part)
partListDecoder =
  Decode.list partDecoder

partDecoder : Decoder Part
partDecoder =
  Decode.map4 Part
    (field "id" Decode.int)
    (field "name" Decode.string)
    (field "ingredients" ingrListDecoder)
    (field "uuid" Decode.string)

partLightDecoder : Decoder PartLight
partLightDecoder =
  Decode.map3 PartLight
    (field "id" Decode.int)
    (field "name" Decode.string)
    (field "uuid" Decode.string)

unitDecoder : Decoder Unit
unitDecoder = Decode.map4 Unit
  (field "id" Decode.int)
  (field "name" Decode.string)
  (field "unitCategory" unitCategoryDecoder)
  (field "uuid" Decode.string)

unitCategoryDecoder : Decoder UnitCategory
unitCategoryDecoder = Decode.map3 UnitCategory
  (field "id" Decode.int)
  (field "name" Decode.string)
  (field "uuid" Decode.string)

sourceDecoder : Decoder Source
sourceDecoder = Decode.map5 Source
  (Decode.maybe <| field "id" Decode.int)
  (Decode.maybe <| field "isbn" Decode.string)
  (field "name" Decode.string)
  (Decode.maybe <| field "year" Decode.string)
  (field "uuid" Decode.string)

todoDecoder : Decoder Todo
todoDecoder = Decode.map6 Todo
  (field "id" Decode.int)
  (Decode.maybe <| field "image" Decode.string)
  (Decode.maybe <| field "image_comment" Decode.string)
  (field "number" Decode.int)
  (field "text" Decode.string)
  (field "uuid" Decode.string)

todoListDecoder : Decoder (List Todo)
todoListDecoder = Decode.list todoDecoder

recipeLightDecoder : Decoder RecipeLight
recipeLightDecoder = Decode.map3 RecipeLight
  (field "id" Decode.int)
  (field "name" Decode.string)
  (field "uuid" Decode.string)

recipeDecoder : Decode.Decoder Recipe
recipeDecoder =
    Decode.succeed Recipe
    |> andMap (Decode.field "aikz" Decode.int)
    |> andMap (Decode.field "id" (Decode.maybe Decode.int))
    |> andMap (Decode.field "image" (Decode.maybe Decode.string))
    |> andMap (Decode.field "ingredients" ingrListDecoder)
    |> andMap (Decode.field "parts" partListDecoder)
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
    |> andMap (Decode.field "tags" tagListDecoder)
    |> andMap (Decode.field "todos" todoListDecoder)
    |> andMap (Decode.field "uuid" Decode.string)
